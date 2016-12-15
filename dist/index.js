'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxTap = require('redux-tap');

var _reduxTap2 = _interopRequireDefault(_reduxTap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultFilter = function defaultFilter(_ref) {
  var meta = _ref.meta;
  return meta && meta.error;
};

var warn = function warn() {
  return console && console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.');
};

exports.default = function (bugsnag, _ref2) {
  var _ref2$filterProperty = _ref2.filterProperty;
  var filterProperty = _ref2$filterProperty === undefined ? defaultFilter : _ref2$filterProperty;
  return (0, _reduxTap2.default)(filterProperty, function (error, action, store) {
    if (bugsnag) {
      var args = [error, {
        'Redux State': store.getState()
      }];

      typeof bugsnag.notifyException === 'function' ? bugsnag.notifyException.apply(bugsnag, args) : bugsnag.notify.apply(bugsnag, args);
    } else {
      return warn();
    }
  });
};
