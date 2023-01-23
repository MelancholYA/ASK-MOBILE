import { View, ScrollView, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostsList from "../componants/HomeScreenComponants/Posts";
import Home from "../screens/Main screens/Home";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Post from "../componants/HomeScreenComponants/PostCard";

type ProfileStackParamList = {
  Posts: undefined;
};

const Tab = createMaterialTopTabNavigator<ProfileStackParamList>();

// function ProfileScreens() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
const Posts = () => {
  const user = useSelector((state: RootState) => state.token.user);
  const posts = useSelector((state: RootState) => state.posts.posts);
  return (
    <View style={{ height: 500 }}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </View>
  );
};

const ProfileScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={Posts}
      />
    </Tab.Navigator>
  );
};

export default ProfileScreens;
