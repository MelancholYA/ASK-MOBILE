import {
  StyleSheet,
  ImageBackground,
  FlatList,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Post, {
  userImage,
} from "../../componants/HomeScreenComponants/PostCard";
import ImagePicker from "../../componants/Gloabls/ImagePicker";
import { texture } from "./Welcome";
import CustomText from "../../componants/Gloabls/CustomText";
import ProfileScreens from "../../navigation/ProfileScreens";
import Posts, { NoData } from "../../componants/HomeScreenComponants/Posts";
import ProfilePost from "../../componants/ProfileScreenComponants/ProfilePost";
import ProfileHeader from "../../componants/ProfileScreenComponants/ProfileHeader";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";

interface Props extends NativeStackScreenProps<RootStackParamList, "Profile"> {}

const Profile = ({ navigation }: Props) => {
  const user = useSelector((state: RootState) => state.token.user);
  const posts = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.user.id === user?.id
  );

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <View style={styles.buttonsContainer}>
        <Button
          textColor="#FCA311"
          style={styles.button}
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate("NewPost")}
        >
          Post a question
        </Button>
        <Button
          textColor="#FCA311"
          icon="account-edit"
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate("Home")}
        >
          Edit Profile
        </Button>
      </View>
      <FlatList
        ListEmptyComponent={<NoData text="You don't have any posts yet" />}
        contentContainerStyle={{ padding: 10 }}
        data={posts}
        renderItem={({ item }) => <ProfilePost data={item} />}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  button: {
    width: "45%",
  },
});
