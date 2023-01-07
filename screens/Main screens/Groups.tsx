import { View } from "react-native";
import React from "react";
import Filter from "../../componants/Filter";
import GroupsContainer from "../../componants/GroupsContainer";

type Props = {};

const Groups = (props: Props) => {
  return (
    <View>
      <Filter Case="groupFilterChips" />
      <GroupsContainer />
    </View>
  );
};

export default Groups;
