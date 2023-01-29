import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoData } from "../../componants/HomeScreenComponants/Posts";
import ProfilePost from "../../componants/ProfileScreenComponants/ProfilePost";
import ProfileHeader from "../../componants/ProfileScreenComponants/ProfileHeader";
import { Button, IconButton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";

interface Props extends NativeStackScreenProps<RootStackParamList, "Profile"> {}
type screenName = "NewPost" | "EditProfile" | "Settings";

const Profile = ({ navigation }: Props) => {
  const user = useSelector((state: RootState) => state.token.user);
  const posts = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.user.id === user?.id
  );

  const handleNavigation = (screen: screenName) => {
    navigation.navigate(screen);
  };

  return (
    user && (
      <View style={styles.container}>
        <ProfileHeader user={user} />
        <View style={styles.buttonsContainer}>
          <Button
            textColor="#FCA311"
            style={styles.button}
            icon="plus"
            mode="contained"
            onPress={() => handleNavigation("NewPost")}
          >
            Post a question
          </Button>
          <Button
            textColor="#FCA311"
            icon="account-edit"
            style={styles.button}
            mode="contained"
            onPress={() => handleNavigation("EditProfile")}
          >
            Edit Profile
          </Button>
          <IconButton
            containerColor="#14213D"
            iconColor="#FCA311"
            onPress={() => handleNavigation("Settings")}
            style={[styles.button, { margin: 0 }]}
            mode="contained"
            icon="cog"
          />
        </View>
        <FlatList
          ListEmptyComponent={<NoData text="You don't have any posts yet" />}
          contentContainerStyle={{ padding: 10 }}
          data={posts}
          renderItem={({ item }) => <ProfilePost data={item} />}
        />
      </View>
    )
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 5,
  },
});
