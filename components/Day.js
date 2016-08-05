import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    hasEvent: PropTypes.bool,
    backgroundEvent: PropTypes.any,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, hasEvent) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller && customStyle.dayCircleFiller];

    /*if (isSelected && !isToday) {
      dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle && customStyle.selectedDayCircle);
    } else if (isSelected && isToday) {
      dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle && customStyle.currentDayCircle);
    }*/
    if (hasEvent) {
      dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle && customStyle.hasEventCircle, styles[this.props.backgroundEvent])
    }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, hasEvent) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText && customStyle.currentDayText);
    }

    if (hasEvent) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText && customStyle.hasEventText, styles.selectedDayText)
    }
    return dayTextStyle;
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      hasEvent,
      isWeekend,
      isSelected,
      backgroundEvent,
      isToday,
      usingEvents,
    } = this.props;
    const styleCircle = this.dayCircleStyle(isWeekend, isSelected, isToday, hasEvent);
    console.log(styleCircle);
    return filler
    ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      )
    : (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.dayButton, customStyle.dayButton]}>
          <View style={styleCircle}>
            <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, hasEvent)}>{caption}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
