import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import CustomText from "../../componants/Gloabls/CustomText";
import GroupHeader from "../../componants/GroupScreenComponants/GroupHeader";

import { RootState } from "../../redux/store";
import { RootStackParamList } from "../../Main";
import Post from "../../componants/HomeScreenComponants/Post";
import { NoData } from "../../componants/HomeScreenComponants/Posts";

type Props = NativeStackScreenProps<RootStackParamList, "Group">;

const Group = ({ route, navigation }: Props) => {
  const id = route.params.groupId;
  const group = useSelector((state: RootState) => state.groups.groups).filter(
    (group) => group.id === id
  )[0];

  return (
    <>
      <GroupHeader
        navigation={navigation}
        group={group}
      />
      <View style={styles.container}>
        <CustomText color="white">{group.members} Members</CustomText>
        <View style={styles.divider}></View>
        <CustomText color="white">{group.postsLength} Questions</CustomText>
      </View>
      <FlatList
        style={{ padding: 10 }}
        data={group.posts}
        ListEmptyComponent={<NoData text="No posts in this group yet" />}
        renderItem={(item) => (
          <Post
            footerless={!group.joined}
            post={item.item}
            key={item.item.id}
          />
        )}
      />
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
});
