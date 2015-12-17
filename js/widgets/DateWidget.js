import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'

export const MONGO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSSZ'

export default class DateWidget extends Component {


  constructor(props, context) {
    super(props, context);

    let {selected} = this.props

    this.state = {
      selectedDay: selected ? moment(selected).toDate() : moment().toDate(),
      calendar_display: false,
    }
  }

  _calendarIconClick() {
    this.setState({
      calendar_display: !this.state.calendar_display,
    })
  }

  handleDayClick(e, day, modifiers) {
    this.setState({
      value: moment(day).format(MONGO_DATE_FORMAT),
      selectedDay: modifiers.indexOf("selected") > -1 ? null : day,
      calendar_display: false
    })
    this.props.onChange(day)
  }

  render() {
    let { selectedDay } = this.state
    console.log(selectedDay)
    return (
      <div className="datePicker-wrapper">
        <i
          className="fa fa-calendar-check-o datePicker-icon"
          onClick={this._calendarIconClick.bind(this)}>
        </i>
        {
          this.state.calendar_display &&
          <DayPicker
            className="datePicker"
            modifiers={{
              selected: day => DateUtils.isSameDay(selectedDay, day)
            }}
            initialMonth={ selectedDay }
            onDayClick={ this.handleDayClick.bind(this) }/>
        }
      </div>
    );
  }

}