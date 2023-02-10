import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Filter from "../../componants/Gloabls/Filter";
import GroupsContainer from "../../componants/GroupsScreenComponants/GroupsContainer";
import { ActivityIndicator, FAB } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";
import useFetch from "../../helpers/useFetch";
import { useDispatch } from "react-redux";
import { setGroups } from "../../redux/slices/groupsSlice";

interface Props extends NativeStackScreenProps<RootStackParamList, "Groups"> {}

const Groups = (props: Props) => {
  const dispatch = useDispatch();

  const { clearData, data, getData, loading } = useFetch();

  useEffect(() => {
    getData("groups");
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setGroups(data.data.groups));
    }
    return () => clearData();
  }, [data]);

  return (
    <View style={styles.container}>
      <Filter
        shadow
        Case="groupFilterChips"
      />
      {loading && <ActivityIndicator />}
      <GroupsContainer />
      <FAB
        theme={{ roundness: 100 }}
        onPress={() => props.navigation.navigate("NewGroup")}
        style={styles.button}
        color="#FCA311"
        icon="plus"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Groups;
