'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _Navigation = require('./Calendar/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _CenturyView = require('./CenturyView');

var _CenturyView2 = _interopRequireDefault(_CenturyView);

var _DecadeView = require('./DecadeView');

var _DecadeView2 = _interopRequireDefault(_DecadeView);

var _YearView = require('./YearView');

var _YearView2 = _interopRequireDefault(_YearView);

var _MonthView = require('./MonthView');

var _MonthView2 = _interopRequireDefault(_MonthView);

var _dates = require('./shared/dates');

var _propTypes3 = require('./shared/propTypes');

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var datesAreDifferent = function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
};

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.getValueFrom = function (value) {
      if (!value) {
        return null;
      }

      var _this$props = _this.props,
          maxDate = _this$props.maxDate,
          minDate = _this$props.minDate;

      var rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;
      var valueFromDate = new Date(rawValueFrom);

      if (isNaN(valueFromDate.getTime())) {
        throw new Error('Invalid date: ' + value);
      }

      var valueFrom = (0, _dates.getBegin)(_this.valueType, valueFromDate);

      return (0, _utils.between)(valueFrom, minDate, maxDate);
    }, _this.getValueTo = function (value) {
      if (!value) {
        return null;
      }

      var _this$props2 = _this.props,
          maxDate = _this$props2.maxDate,
          minDate = _this$props2.minDate;

      var rawValueTo = value instanceof Array && value.length === 2 ? value[1] : value;
      var valueToDate = new Date(rawValueTo);

      if (isNaN(valueToDate.getTime())) {
        throw new Error('Invalid date: ' + value);
      }

      var valueTo = (0, _dates.getEnd)(_this.valueType, valueToDate);

      return (0, _utils.between)(valueTo, minDate, maxDate);
    }, _this.state = {
      activeStartDate: _this.getActiveStartDate(_this.props, _this.props.activeStartDate || _this.props.value || new Date()),
      hover: null,
      view: _this.getView(),
      value: _this.props.value
    }, _this.setActiveStartDate = function (activeStartDate) {
      _this.setState({ activeStartDate: activeStartDate }, function () {
        (0, _utils.callIfDefined)(_this.props.onActiveDateChange, {
          activeStartDate: activeStartDate,
          view: _this.state.view
        });
      });
    }, _this.drillDown = function (activeStartDate) {
      if (!_this.drillDownAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        var nextView = views[views.indexOf(prevState.view) + 1];
        return {
          activeStartDate: activeStartDate,
          view: nextView
        };
      }, function () {
        (0, _utils.callIfDefined)(_this.props.onDrillDown, {
          activeStartDate: activeStartDate,
          view: _this.state.view
        });
      });
    }, _this.drillUp = function () {
      if (!_this.drillUpAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        var nextView = views[views.indexOf(prevState.view) - 1];
        var activeStartDate = (0, _dates.getBegin)(nextView, prevState.activeStartDate);

        return {
          activeStartDate: activeStartDate,
          view: nextView
        };
      }, function () {
        (0, _utils.callIfDefined)(_this.props.onDrillUp, {
          activeStartDate: _this.state.activeStartDate,
          view: _this.state.view
        });
      });
    }, _this.onChange = function (value) {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          selectRange = _this$props3.selectRange;


      var nextValue = void 0;
      var callback = void 0;
      if (selectRange) {
        var previousValue = _this.state.value;
        // Range selection turned on

        if (!previousValue || [].concat(previousValue).length !== 1 // 0 or 2 - either way we're starting a new array
        ) {
            // First value
            nextValue = (0, _dates.getBegin)(_this.valueType, value);
          } else {
          // Second value
          nextValue = (0, _dates.getValueRange)(_this.valueType, previousValue, value);
          callback = function callback() {
            return (0, _utils.callIfDefined)(onChange, nextValue);
          };
        }
      } else {
        // Range selection turned off
        nextValue = _this.getProcessedValue(value);
        callback = function callback() {
          return (0, _utils.callIfDefined)(onChange, nextValue);
        };
      }

      _this.setState({ value: nextValue }, callback);
    }, _this.onMouseOver = function (value) {
      _this.setState({ hover: value });
    }, _this.onMouseOut = function () {
      _this.setState({ hover: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'getValueArray',
    value: function getValueArray(value) {
      if (value instanceof Array) {
        return value;
      }

      return [this.getValueFrom(value), this.getValueTo(value)];
    }
  }, {
    key: 'getLimitedViews',


    /**
     * Returns views array with disallowed values cut off.
     */
    value: function getLimitedViews() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var minDetail = props.minDetail,
          maxDetail = props.maxDetail;


      return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
    }

    /**
     * Determines whether a given view is allowed with currently applied settings.
     */

  }, {
    key: 'isViewAllowed',
    value: function isViewAllowed() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.view;

      var views = this.getLimitedViews(props);

      return views.indexOf(view) !== -1;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;


      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        case 'range':
          return this.getValueArray(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextActiveStartDate = nextProps.activeStartDate,
          nextValue = nextProps.value;
      var _state = this.state,
          activeStartDate = _state.activeStartDate,
          value = _state.value;


      var nextState = {};

      var allowedViewChanged = nextProps.minDetail !== this.props.minDetail || nextProps.maxDetail !== this.props.maxDetail;

      if (allowedViewChanged && !this.isViewAllowed(nextProps)) {
        nextState.view = this.getView(nextProps);
      }

      if (allowedViewChanged || datesAreDifferent.apply(undefined, _toConsumableArray([nextValue, value].map(this.getValueFrom))) || datesAreDifferent.apply(undefined, _toConsumableArray([nextValue, value].map(this.getValueTo)))) {
        nextState.value = nextValue;
        nextState.activeStartDate = this.getActiveStartDate(nextProps, nextValue);
      } else if (datesAreDifferent.apply(undefined, _toConsumableArray([nextActiveStartDate, activeStartDate].map(this.getValueFrom)))) {
        nextState.activeStartDate = this.getActiveStartDate(nextProps, nextActiveStartDate);
      }

      if (!nextProps.selectRange && this.props.selectRange) {
        nextState.hover = null;
      }

      this.setState(nextState);
    }
  }, {
    key: 'getActiveStartDate',
    value: function getActiveStartDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var valueFrom = arguments[1];

      var rangeType = this.getView(props);
      return (0, _dates.getBegin)(rangeType, valueFrom);
    }
  }, {
    key: 'getView',
    value: function getView() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = props.view;


      if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
        return view;
      }

      return this.getLimitedViews(props).pop();
    }

    /**
     * Called when the user uses navigation buttons.
     */

  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props,
          calendarType = _props.calendarType,
          locale = _props.locale,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          renderChildren = _props.renderChildren,
          tileClassName = _props.tileClassName,
          tileContent = _props.tileContent,
          tileDisabled = _props.tileDisabled;
      var _state2 = this.state,
          activeStartDate = _state2.activeStartDate,
          hover = _state2.hover,
          value = _state2.value,
          view = _state2.view;
      var onMouseOver = this.onMouseOver,
          valueType = this.valueType;


      var commonProps = {
        activeStartDate: activeStartDate,
        hover: hover,
        locale: locale,
        maxDate: maxDate,
        minDate: minDate,
        onMouseOver: this.props.selectRange ? onMouseOver : null,
        tileClassName: tileClassName,
        tileContent: tileContent || renderChildren, // For backwards compatibility
        tileDisabled: tileDisabled,
        value: value,
        valueType: valueType
      };

      var clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

      switch (view) {
        case 'century':
          return _react2.default.createElement(_CenturyView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDecade)
          }, commonProps));
        case 'decade':
          return _react2.default.createElement(_DecadeView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickYear)
          }, commonProps));
        case 'year':
          return _react2.default.createElement(_YearView2.default, _extends({
            formatMonth: this.props.formatMonth,
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickMonth)
          }, commonProps));
        case 'month':
          return _react2.default.createElement(_MonthView2.default, _extends({
            calendarType: calendarType,
            formatShortWeekday: this.props.formatShortWeekday,
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDay),
            onClickWeekNumber: this.props.onClickWeekNumber,
            showNeighboringMonth: this.props.showNeighboringMonth,
            showWeekNumbers: this.props.showWeekNumbers
          }, commonProps));
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      var showNavigation = this.props.showNavigation;


      if (!showNavigation) {
        return null;
      }

      return _react2.default.createElement(_Navigation2.default, {
        activeRange: this.state.activeRange,
        activeStartDate: this.state.activeStartDate,
        drillUp: this.drillUp,
        formatMonthYear: this.props.formatMonthYear,
        locale: this.props.locale,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate,
        next2Label: this.props.next2Label,
        nextLabel: this.props.nextLabel,
        prev2Label: this.props.prev2Label,
        prevLabel: this.props.prevLabel,
        setActiveStartDate: this.setActiveStartDate,
        view: this.state.view,
        views: this.getLimitedViews()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          selectRange = _props2.selectRange;
      var value = this.state.value;
      var onMouseOut = this.onMouseOut;

      var valueArray = [].concat(value);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _mergeClassNames2.default)('react-calendar', selectRange && valueArray.length === 1 && 'react-calendar--selectRange', className),
          onMouseOut: selectRange ? onMouseOut : null,
          onBlur: selectRange ? onMouseOut : null
        },
        this.renderNavigation(),
        this.renderContent()
      );
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) > 0;
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
  view: 'month'
};

Calendar.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date),
  calendarType: _propTypes3.isCalendarType,
  className: _propTypes3.isClassName,
  formatMonth: _propTypes2.default.func,
  formatMonthYear: _propTypes2.default.func,
  formatShortWeekday: _propTypes2.default.func,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onActiveDateChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickWeekNumber: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  onDrillDown: _propTypes2.default.func,
  onDrillUp: _propTypes2.default.func,
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  renderChildren: _propTypes2.default.func, // For backwards compatibility
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']),
  selectRange: _propTypes2.default.bool,
  showNavigation: _propTypes2.default.bool,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  tileClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes3.isClassName]),
  tileContent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  tileDisabled: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes3.isValue]),
  view: _propTypes2.default.oneOf(allViews)
};