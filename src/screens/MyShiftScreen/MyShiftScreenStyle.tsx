// ListItem.js
import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_BLUE,
      },
      sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: Colors.LIGHT_BLUE,
        color: Colors.DEEP_BLUE,
        padding: 10,
      },
      noShiftsText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.SOFT_BLUE,
        textAlign: 'center',
      },
      footerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }
});
