import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

//redux
import { RootState } from "./redux/store";
import { setToken } from "./redux/slices/tokenSlice";

//screens
//main screens
import Welcome from "./screens/Main screens/Welcome";
import Login from "./screens/Main screens/Login";
import Register from "./screens/Main screens/Register";
import Home from "./screens/Main screens/Home";
import Groups from "./screens/Main screens/Groups";
import Messages from "./screens/Main screens/Messages";
import Profile from "./screens/Main screens/Profile";
import Question from "./screens/Main screens/Question";
//sub screens
import Notifications from "./screens/sub screens/Notifications";
import Answer from "./screens/sub screens/Answer";
import Group from "./screens/sub screens/Group";

//headers
import NavBar from "./componants/NavBar";
import CustomScreenHeader from "./componants/CustomScreenHeader";
//tools
import useNotification from "./helpers/useNotification";
import { Snackbar } from "react-native-paper";

type Props = {};
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Groups: undefined;
  Notifications: undefined;
  Messages: undefined;
  Profile: undefined;
  Question: { postId: string };
  Answer: { postId: string; answerId: string; focus?: boolean };
  Group: { groupId: string };
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
        {!token ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Groups"
              component={Groups}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              options={{
                animation: "flip",
                header: (props) => (
                  <CustomScreenHeader
                    navigation={props}
                    color="#D7D9DD"
                    title="Answers"
                  />
                ),
              }}
              name="Question"
              component={Question}
            />
            <Stack.Screen
              options={{
                animation: "flip",
                header: (props) => (
                  <CustomScreenHeader
                    navigation={props}
                    color="#D7D9DD"
                    title="Replies"
                  />
                ),
              }}
              name="Answer"
              component={Answer}
            />
            <Stack.Screen
              options={{
                animation: "flip",
                headerShown: false,
              }}
              name="Group"
              component={Group}
            />
          </>
        )}
      </Stack.Navigator>
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
