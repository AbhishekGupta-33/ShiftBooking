import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MyShiftsScreen from '../screens/MyShiftScreen/MyShiftScreen';
import AvailableShiftsScreen from '../screens/AvailableShiftsScreen/AvailableShiftsScreen';
import { SCREEN_TITLES } from '../utils/strings';
import { StyleSheet } from 'react-native';
import Colors from '../utils/colors';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle : styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.DEEP_BLUE
      }}

      >
        <Tab.Screen name={SCREEN_TITLES.MY_SHIFTS} component={MyShiftsScreen} />
        <Tab.Screen name={SCREEN_TITLES.AVAILABLE_SHIFTS} component={AvailableShiftsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 20,
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
});

export default AppNavigator;