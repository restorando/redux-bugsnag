'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reduxTap = require('redux-tap');

var _reduxTap2 = _interopRequireDefault(_reduxTap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterError = function filterError(_ref) {
  var meta = _ref.meta;
  return meta && meta.error;
};

var warn = function warn() {
  return window !== 'undefined' && _typeof(window.Bugsnag) !== 'object' && console.warn('redux-bugsnag has been executed but it seems like Bugsnag snippet has not been loaded.');
};

exports.default = function () {
  return (0, _reduxTap2.default)(filterError, function (error, action, store) {
    typeof window !== 'undefined' && _typeof(window.Bugsnag) === 'object' ? window.Bugsnag.notifyException(error) : warn();
  });
};
