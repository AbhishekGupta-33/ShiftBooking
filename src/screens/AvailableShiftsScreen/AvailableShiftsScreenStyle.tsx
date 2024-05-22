import { StyleSheet } from "react-native";
import Colors from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.LIGHT_BLUE
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: Colors.WHITE,
      borderBottomWidth: 1,
      borderBottomColor: Colors.PALE_BLUE,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    selectedTab: {
    },
    tabText: {
      fontSize: 16,
      color: Colors.SOFT_BLUE,
    },
    selectedTabText: {
      fontSize: 16,
      color: Colors.DEEP_BLUE,
      fontWeight: 'bold',
    },
    noShiftsText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.SOFT_BLUE,
      textAlign: 'center',
    }
  });