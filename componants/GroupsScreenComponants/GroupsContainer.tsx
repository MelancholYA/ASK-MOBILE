import { View, Text, FlatList } from "react-native";
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
      ListEmptyComponent={<NoData text="No posts are available" />}
      onEndReached={() => console.log("end")}
      scrollEnabled
      data={groupsToDesplay}
      style={{ padding: 10 }}
      renderItem={(item) => (
        <>
          <GroupCard
            data={item.item}
            key={item.item.id}
          />
        </>
      )}
    />
  );
};

export default GroupsContainer;
