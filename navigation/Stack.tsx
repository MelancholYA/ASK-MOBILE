import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
  Chat: { convoId: string; partnerName: string };
  EditProfile: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackType = ReturnType<
  typeof createNativeStackNavigator<RootStackParamList>
>;
