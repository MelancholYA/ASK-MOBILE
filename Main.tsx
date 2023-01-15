import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

//redux
import { RootState } from "./redux/store";
import { setToken } from "./redux/slices/tokenSlice";

//headers
import NavBar from "./componants/Gloabls/NavBar";

//tools
import useNotification from "./helpers/useNotification";
import { Snackbar } from "react-native-paper";
import MainScreens from "./navigation/mainScreens";
import AuthScreens from "./navigation/AuthScreens";
import { Stack } from "./navigation/Stack";

type Props = {};

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
        const token = await AsyncStorage.getItem("voteAppToken");
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
      <Stack.Navigator
        screenOptions={{
          animation: token ? "none" : "slide_from_bottom",
          header: (props) => {
            return token ? <NavBar props={props} /> : null;
          },
        }}
      >
        {!token ? AuthScreens({ Stack }) : MainScreens({ Stack })}
      </Stack.Navigator>

      {/* Notification */}
      <Snackbar
        action={{
          label: "",
          icon: "close-thick",
          textColor: "white",
        }}
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
