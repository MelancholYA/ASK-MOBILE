import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../screens/Main screens/Home";
import Groups from "../screens/Main screens/Groups";
import Notifications from "../screens/Main screens/Notifications";
import Messages from "../screens/Main screens/Messages";
import Profile from "../screens/Main screens/Profile";
import CustomScreenHeader from "../componants/Gloabls/CustomScreenHeader";
import Question from "../screens/sub screens/Question";
import Replies from "../screens/sub screens/Replies";
import Group from "../screens/sub screens/Group";
import InviteFriend from "../screens/sub screens/InviteFriend";
import NewPost from "../screens/sub screens/NewPost";
import NewGroup from "../screens/sub screens/NewGroup";
import Chat from "../screens/sub screens/Chat";
import { StackType } from "./Stack";

interface Props {
  Stack: StackType;
}

const mainScreens = ({ Stack }: Props) => {
  return (
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
      <Stack.Screen
        options={{
          animation: "flip",
          header: (props) => {
            const params = props.route.params as { partnerName: string };
            return (
              <CustomScreenHeader
                navigation={props}
                title={params.partnerName || "messages"}
              />
            );
          },
        }}
        name="Chat"
        component={Chat}
      />
    </>
  );
};

export default mainScreens;
