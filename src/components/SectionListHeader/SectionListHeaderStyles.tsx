// ListItem.js
import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.VERY_LIGHT_BLUE,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.PALE_BLUE,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.SLATE_BLUE,
  },
  subDetailText:{
    fontSize: 14,
    fontWeight: '500',
    color: Colors.PALE_BLUE,
    marginLeft: 10,
  }
});
 