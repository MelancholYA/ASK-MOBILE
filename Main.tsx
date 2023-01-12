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
import Notifications from "./screens/Main screens/Notifications";

//sub screens
import Question from "./screens/sub screens/Question";
import Replies from "./screens/sub screens/Replies";
import Group from "./screens/sub screens/Group";
import InviteFriend from "./screens/sub screens/InviteFriend";
import NewPost from "./screens/sub screens/NewPost";

//headers
import NavBar from "./componants/Gloabls/NavBar";
import CustomScreenHeader from "./componants/Gloabls/CustomScreenHeader";
//tools
import useNotification from "./helpers/useNotification";
import { Snackbar } from "react-native-paper";
import NewGroup from "./screens/sub screens/NewGroup";

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
  Replies: { postId: string; answerId: string; focus?: boolean };
  Group: { groupId: string };
  InviteAfriend: { groupId: string };
  NewPost: undefined;
  NewGroup: undefined;
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
                    title="Question"
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
              name="Replies"
              component={Replies}
            />
            <Stack.Screen
              options={{
                animation: "flip",
                headerShown: false,
              }}
              name="Group"
              component={Group}
            />
            <Stack.Screen
              options={{
                animation: "flip",
                header: (props) => (
                  <CustomScreenHeader
                    navigation={props}
                    title="Invite a friend"
                  />
                ),
              }}
              name="InviteAfriend"
              component={InviteFriend}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_bottom",
                header: (props) => (
                  <CustomScreenHeader
                    navigation={props}
                    title="New Question"
                  />
                ),
              }}
              name="NewPost"
              component={NewPost}
            />
            <Stack.Screen
              options={{
                animation: "slide_from_bottom",
                header: (props) => (
                  <CustomScreenHeader
                    navigation={props}
                    title="New Group"
                  />
                ),
              }}
              name="NewGroup"
              component={NewGroup}
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
