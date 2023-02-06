import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NoData } from "../../componants/HomeScreenComponants/Posts";
import ProfileHeader from "../../componants/ProfileScreenComponants/ProfileHeader";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";
import useFetch from "../../helpers/useFetch";
import Post from "../../componants/HomeScreenComponants/PostCard";

interface Props extends NativeStackScreenProps<RootStackParamList, "Friend"> {}
type screenName = "NewPost" | "EditProfile" | "Settings";

const Friend = ({ navigation, route }: Props) => {
  const { friendId } = route.params;
  const posts = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.user.id === friendId
  );
  // const [{ data, isLoading, isError }] = useFetch(
  //   "https://api.example.com/data",
  //   {}
  // );

  return (
    <>
      <StatusBar backgroundColor="white" />
      {false ? (
        <ActivityIndicator />
      ) : true ? (
        <NoData text="Something went wrong" />
      ) : (
        <View style={styles.container}>
          {/* <ProfileHeader user={data} /> */}
          <View style={styles.buttonsContainer}>
            <Button
              textColor="#FCA311"
              style={styles.button}
              icon="plus"
              mode="contained"
              onPress={() => {}}
            >
              Add as a friend
            </Button>
            <Button
              textColor="#FCA311"
              icon="account-edit"
              style={styles.button}
              mode="contained"
              onPress={() => {}}
            >
              Message
            </Button>
          </View>
          <FlatList
            ListEmptyComponent={
              <NoData text="user dosen't have any posts yet" />
            }
            contentContainerStyle={{ padding: 10 }}
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
          />
        </View>
      )}
    </>
  );
};

export default Friend;

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
