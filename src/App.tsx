/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Abhishek React native dev created this on 22 May
 * @format
 */
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import ShiftsProvider from './services/api';


function App(): React.JSX.Element {

  return (
    // Wrap the app in the ShiftsProvider
    <ShiftsProvider>
      <AppNavigator />
    </ShiftsProvider>
  );
}

export default App;
