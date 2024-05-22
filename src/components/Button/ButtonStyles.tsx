// ListItem.js
import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

export const styles = StyleSheet.create({
  buttonViewStyle: {
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  successViewStyle: {
    borderColor: Colors.FOREST_GREEN,
  },
  successTextStyle: {
    color: Colors.FOREST_GREEN,
  },
  failViewStyle: {
    borderColor: Colors.HOT_PINK,
  },
  failTextStyle: {
    color: Colors.HOT_PINK,
  },
  disableViewStyle: {
    borderColor: Colors.PALE_BLUE,
  },
  disableTextStyle: {
    color: Colors.PALE_BLUE,
  },
});
