/* eslint-disable react/no-unstable-nested-components */
import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Financial from './Financial';
import {colors} from '../utils/colors';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and Ionicons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entotype from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const globalScreenOptions = {
  tabBarStyle: {
    height: 70,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    // justifyContent: "center",
    // alignItems: "center",
    gap: Platform.OS === 'ios' ? -15 : 0,
    // paddingVertical: 50,
    borderRadius: 50,
    marginBottom: 40,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 5,
  },
  tabBarActiveTintColor: colors.black,
  tabBarInactiveTintColor: '#808080',
  tabBarLabelStyle: {fontSize: 13, fontWeight: '600'},
  headerShown: false,
  tabBarItemStyle: {
    // paddingTop: 10,
  },
  // tabBarItemStyle: {
  //   alignItems: 'center', // Center the items horizontally
  //   justifyContent: 'center', // Center the items vertically
  // },
};

const DashboardProvider = ({route}: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  // console.log(routeName, route);

  return (
    <Tab.Navigator screenOptions={globalScreenOptions as any}>
      {/* <Tab.Group> */}

      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({color}) => (
            <Entotype
              name="home"
              color={color}
              size={28}
              style={routeName === 'Home' && styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Financial"
        component={Financial}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="bank"
              color={color}
              size={28}
              style={routeName === 'Financial' && styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Financial}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
              name="rocket"
              color={color}
              size={28}
              style={routeName === 'Discover' && styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recent"
        component={Financial}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="history"
              color={color}
              size={28}
              style={routeName === 'Recent' && styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Financial}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="user"
              color={color}
              size={28}
              style={routeName === 'Profile' && styles.icon}
            />
          ),
        }}
      />
      {/* </Tab.Group> */}
    </Tab.Navigator>
  );
};

export default DashboardProvider;

const styles = StyleSheet.create({
  icon: {
    marginTop: -20,
    // height: 50,
    // width: 50,
    fontSize: 50,
  },
});
