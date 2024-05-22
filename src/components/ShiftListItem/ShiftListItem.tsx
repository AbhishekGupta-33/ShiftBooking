import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './ShiftListItemStyles';
import { formatTime, isTimeInFuture } from '../../utils/globalFunction';
import Button from '../Button/Button';
import { ButtonType, ShiftStatus } from '../../utils/globalConstant';
import { IN_SCREEN_LABELS } from '../../utils/strings';
import Colors from '../../utils/colors';

interface ShiftListItemProps {
  area?: string;
  startTime: number;
  endTime: number;
  booked?: boolean;
  status?: string
  isStatusShow?: boolean;
  onPress: () => void;
  buttonType?: string;
  buttonTitle: string;
  buttonLoading?: boolean;
}

const ShiftListItem: React.FC<ShiftListItemProps> = ({
  area,
  startTime,
  endTime,
  booked,
  status,
  isStatusShow = false,
  buttonTitle = IN_SCREEN_LABELS.MY_SHIFTS.CANCEL,
  onPress,
  buttonType,
  buttonLoading
}) => {
  // Convert timestamps to readable format
  const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

  // Check if the shift is in the future
  const isDisable = !isTimeInFuture(startTime);

  // Set the status color based on the shift status
  let statusColor = status == ShiftStatus.OVERLAPPING ? { color: Colors.HOT_PINK } : {}

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.time}>{timeRange}</Text>
        {area ? <Text style={styles.location}>{area}</Text> : null}
      </View>
      {
          isStatusShow ?
            // Show the shift status if isStatusShow is true
            <Text style={[styles.status, statusColor]}>{status == ShiftStatus.OVERLAPPING ? IN_SCREEN_LABELS.AVAILABLE_SHIFTS.OVERLAPPING : booked ?  IN_SCREEN_LABELS.AVAILABLE_SHIFTS.BOOKED : ''}</Text>
            : null
      }
      <Button
        onPress={onPress}
        text={buttonTitle}
        isLoading={buttonLoading}
        buttonType={buttonType ? buttonType : isDisable ? ButtonType.DISABLED : ButtonType.FAIL}
      />
    </View>
  );
};

export default ShiftListItem;
