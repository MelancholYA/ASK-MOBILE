import { FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { NoData } from "../HomeScreenComponants/Posts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearGroups,
  Igroup,
  setGroups,
  setGroupsToDisplay,
} from "../../redux/slices/groupsSlice";
import GroupCard from "./GroupCard";
import useFetch from "../../helpers/useFetch";
import { ActivityIndicator } from "react-native-paper";
import CustomText from "../Gloabls/CustomText";

type Props = {
  groupsToDesplay: Igroup[];
};

const GroupsContainer = ({ groupsToDesplay }: Props) => {
  const dispatch = useDispatch();
  const { clearData, data, getData, loading } = useFetch();
  const [page, setPage] = useState(1);
  const [hasNextPage, sethasNextPage] = useState(false);

  useEffect(() => {
    getData("groups/" + page);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setGroups(data.data.groups));
      sethasNextPage(data.data.hasNextPage);
    }
    return () => clearData();
  }, [data]);

  const refresh = () => {
    dispatch(clearGroups());
    setPage(1);
    getData("groups/" + 1);
  };

  return (
    <FlatList
      data={groupsToDesplay}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refresh}
        />
      }
      ListEmptyComponent={
        !loading ? <NoData text="No Groups Are Available" /> : null
      }
      ListFooterComponent={
        groupsToDesplay.length ? (
          loading ? (
            <ActivityIndicator />
          ) : (
            <CustomText
              color="grey"
              style={{ textAlign: "center", padding: 12 }}
            >
              No More Groups
            </CustomText>
          )
        ) : null
      }
      onEndReached={() => {
        if (hasNextPage) {
          setPage(page + 1);
        }
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
