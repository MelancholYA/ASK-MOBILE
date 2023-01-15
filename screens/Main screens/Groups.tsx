import { View, StyleSheet } from "react-native";
import React from "react";
import Filter from "../../componants/Gloabls/Filter";
import GroupsContainer from "../../componants/GroupsScreenComponants/GroupsContainer";
import { FAB } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";

interface Props extends NativeStackScreenProps<RootStackParamList, "Groups"> {}

const Groups = (props: Props) => {
  return (
    <View style={styles.container}>
      <Filter
        shadow
        Case="groupFilterChips"
      />
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
