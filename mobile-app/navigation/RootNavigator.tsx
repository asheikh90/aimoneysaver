import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import BillDetailsScreen from '../screens/bills/BillDetailsScreen';
import GroupDiscountDetailsScreen from '../screens/groups/GroupDiscountDetailsScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  BillDetails: { billId: string };
  GroupDiscountDetails: { groupId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isFirstLaunch } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isFirstLaunch && !isAuthenticated ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : !isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen 
            name="BillDetails" 
            component={BillDetailsScreen} 
            options={{
              headerShown: true,
              title: 'Bill Analysis',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="GroupDiscountDetails" 
            component={GroupDiscountDetailsScreen} 
            options={{
              headerShown: true,
              title: 'Group Discount',
              headerBackTitle: 'Back',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
