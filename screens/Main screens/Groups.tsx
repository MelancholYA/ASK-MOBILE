import { View } from "react-native";
import React from "react";
import Filter from "../../componants/Gloabls/Filter";
import GroupsContainer from "../../componants/GroupsScreenComponants/GroupsContainer";

type Props = {};

const Groups = (props: Props) => {
  return (
    <View>
      <Filter
        shadow
        Case="groupFilterChips"
      />
      <GroupsContainer />
    </View>
  );
};

export default Groups;
