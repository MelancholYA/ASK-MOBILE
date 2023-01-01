import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { RootState } from "./redux/store";
import * as Font from "expo-font";

import Welcome from "./screens/Welcome";
import { setToken } from "./redux/slices/tokenSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import { Snackbar } from "react-native-paper";
import useNotification from "./helpers/useNotification";
import Register from "./screens/Register";

type Props = {};
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  welcome2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

const Main = (props: Props) => {
  const { dismissNote } = useNotification();
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.value);
  const { body, show } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
          "Montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
          "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
          "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        });
        const token = await AsyncStorage.getItem("askToken");
        dispatch(setToken(token));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    };
    load();
  }, [appIsReady]);

  return !appIsReady ? (
    <ActivityIndicator
      size="large"
      color="#14213D"
      style={{ flex: 1 }}
    />
  ) : (
    <>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={Register}
            />
          </>
        ) : (
          <></>
        )}
      </Stack.Navigator>
      <Snackbar
        action={{ label: "undo", textColor: "white" }}
        onDismiss={dismissNote}
        visible={show}
        duration={15000}
        theme={{ roundness: 5 }}
      >
        {body}
      </Snackbar>
    </>
  );
};

export default Main;
