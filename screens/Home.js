import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import Profile from "./Profile";
import Product from "./Product";
import Download from "./Download";
import Cards from "./Cards";

const Tab = createBottomTabNavigator();

const ComponentBottombar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Product"
      screenOptions={{
        tabBarActiveTintColor: "#333",
      }}
    >
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarLabel: "PRODUCT",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Download"
        component={Download}
        options={{
          tabBarLabel: "DOWNLOAD",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="download" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Card"
        component={Cards}
        options={{
          tabBarLabel: "Card",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "PROFILE",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Home() {
  return <ComponentBottombar />;
}
