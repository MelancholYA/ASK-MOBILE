import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import useFetch from "../../helpers/useFetch";
import CustomText from "../../componants/Gloabls/CustomText";
import GroupHeader from "../../componants/GroupScreenComponants/GroupHeader";
import PostCard from "../../componants/HomeScreenComponants/PostCard";
import { NoData } from "../../componants/HomeScreenComponants/Posts";

import { RootState } from "../../redux/store";
import { RootStackParamList } from "../../navigation/Stack";
import { ActivityIndicator, Banner, FAB } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Group">;

const Group = ({ route, navigation }: Props) => {
  const { clearData, data, getData, loading } = useFetch();
  const id = route.params.groupId;
  let group = useSelector((state: RootState) => state.groups.groups).filter(
    (group) => group._id === id
  )[0];

  return (
    <>
      <StatusBar backgroundColor="#303030" />
      {/* <Banner
        visible={showBanner}
        actions={[
          {
            label: "Dismiss",

            onPress: () => setShowBanner(false),
          },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          isError && (
            <CustomText>
              Something went wrong , check your connection or reload the app
            </CustomText>
          )
        )}
      </Banner> */}
      {!group ? (
        <NoData text="Something went wrong , check your connection or reload the app" />
      ) : (
        <>
          <GroupHeader
            navigation={navigation}
            group={group}
          />
          <View style={styles.container}>
            <CustomText color="white">
              {" "}
              {group.membersLength === 0
                ? "No Members"
                : group.membersLength > 1
                ? group.membersLength + " members"
                : "1 member"}
            </CustomText>
            <View style={styles.divider}></View>
            <CustomText color="white">
              {group?.postsLength} Questions
            </CustomText>
          </View>
          {group.joined && (
            <FAB
              theme={{ roundness: 100 }}
              onPress={() =>
                navigation.navigate("NewPost", {
                  groupId: id,
                  groupName: group.name,
                })
              }
              style={styles.button}
              color="#FCA311"
              icon="fountain-pen-tip"
            />
          )}

          <FlatList
            style={{ padding: 10 }}
            data={group.posts}
            ListEmptyComponent={<NoData text="No posts in this group yet" />}
            renderItem={(item) => (
              <PostCard
                footerless={!group.joined}
                post={item.item}
                key={item.item._id}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#14213D",
    padding: 15,
    paddingVertical: 20,
    margin: 10,
    marginBottom: 0,
    borderRadius: 4,
  },
  divider: {
    transform: [{ rotate: "90deg" }],
    backgroundColor: "white",
    height: 3,
    width: 30,
    borderRadius: 15,
  },
  button: {
    position: "absolute",
    zIndex: 99,
    bottom: 20,
    right: 20,
    backgroundColor: "#14213D",
    borderWidth: 2,
    borderColor: "#FCA311",
  },
});
