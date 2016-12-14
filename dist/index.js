'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxTap = require('redux-tap');

var _reduxTap2 = _interopRequireDefault(_reduxTap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterError = function filterError(_ref) {
  var meta = _ref.meta;
  return meta && meta.error;
};

var warn = function warn() {
  return console && console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.');
};

exports.default = function (bugsnag) {
  return (0, _reduxTap2.default)(filterError, function (error, action, store) {
    if (bugsnag) {
      typeof bugsnag.notifyException === 'function' ? bugsnag.notifyException(error) : bugsnag.notify(error);
    } else {
      return warn();
    }
  });
};
