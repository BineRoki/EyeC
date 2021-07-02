import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import AdminScreen from "./screens/AdminScreen";

import { firebase } from "./src/firebase/config";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LogInScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";

import { decode, encode } from "base-64";
import { TouchableOpacity } from "react-native-gesture-handler";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // if (loading) {
  //   return (
  //     <></>
  //   )
  // }

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            let userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const userPicker = (user) => {
    if (user.isVendor == "second") {
      return (
        <Stack.Screen name="AdminHome" options={{ headerShown: false }}>
          {(props) => <AdminScreen {...props} extraData={user} />}
        </Stack.Screen>
      );
    } else {
      return (
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>
      );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          userPicker(user)
        ) : (
          <>
            <Stack.Screen
              name="Getting Started"
              options={{ headerShown: false }}
              component={WelcomeScreen}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{ flex: 1 }}>
    //   <AdminScreen />
    // </View>
  );
}
