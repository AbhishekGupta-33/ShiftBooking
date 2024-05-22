// ListItem.js
import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.PALE_BLUE,
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  time: {
    fontSize: 16,
    color: Colors.SLATE_BLUE,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: Colors.SOFT_BLUE,
  },
  cancelButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.SOFT_PINK, // Pink border to match the design
    borderRadius: 10,
    backgroundColor: 'transparent', // Transparent background to match the design
  },
  cancelButtonDisabled:{
    opacity: 0.5,
  },
  cancelButtonText: {
    color: Colors.SOFT_PINK,   // Pink text color to match the design
    fontSize: 14,
    fontWeight:'500'
  },
  status:{
    fontSize: 14,
    fontWeight:'500',
    color: Colors.SOFT_BLUE,
  }
});
