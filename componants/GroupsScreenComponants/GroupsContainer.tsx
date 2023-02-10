import { FlatList } from "react-native";
import React, { useEffect } from "react";
import { NoData } from "../HomeScreenComponants/Posts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setGroupsToDisplay } from "../../redux/slices/groupsSlice";
import GroupCard from "./GroupCard";

type Props = {};

const GroupsContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { groupsToDesplay, groups } = useSelector(
    (state: RootState) => state.groups
  );
  const { groupFilterChips } = useSelector((state: RootState) => state.chips);
  useEffect(() => {
    dispatch(setGroupsToDisplay(groupFilterChips));
  }, [groupFilterChips, groups]);

  return (
    <FlatList
      ListEmptyComponent={<NoData text="No groups are available" />}
      onEndReached={() => console.log("end")}
      data={groupsToDesplay}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      renderItem={(item) => (
        <GroupCard
          data={item.item}
          key={item.item._id}
        />
      )}
    />
  );
};

export default GroupsContainer;
