import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  clearPosts,
  setPosts,
  setPostsToDisplay,
} from "../../redux/slices/postsSlice";
import CustomText from "../Gloabls/CustomText";
import PostCard from "./PostCard";
import useFetch from "../../helpers/useFetch";
import { ActivityIndicator, Button } from "react-native-paper";

type Props = {};

//todo pagination to answers + replies length

export const NoData = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText
        style={{ textAlign: "center" }}
        variant="titleMedium"
      >
        {text}
      </CustomText>
    </View>
  );
};

const Posts = (props: Props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [hasNextPage, sethasNextPage] = useState(false);
  const { postsToDisplay } = useSelector((state: RootState) => state.posts);

  const { clearData, data, getData, loading } = useFetch();

  const refresh = () => {
    dispatch(clearPosts());
    setPage(1);
    getData("posts/" + 1);
  };

  useEffect(() => {
    console.log("changer");
    getData("posts/" + page);
  }, [page]);

  useEffect(() => {
    console.log({ data });
    if (data) {
      dispatch(setPosts(data.data.posts));
      sethasNextPage(data.data.hasNextPage);
    }
    return () => clearData();
  }, [data]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refresh}
        />
      }
      ListEmptyComponent={
        !loading ? <NoData text="No questions are available" /> : null
      }
      ListFooterComponent={
        postsToDisplay.length ? (
          loading ? (
            <ActivityIndicator />
          ) : (
            <CustomText
              color="grey"
              style={{ textAlign: "center", padding: 12 }}
            >
              No more questions
            </CustomText>
          )
        ) : null
      }
      onEndReached={() => {
        if (hasNextPage) {
          setPage(page + 1);
        }
      }}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 10 }}
      scrollEnabled
      data={postsToDisplay}
      renderItem={(item) => (
        <PostCard
          post={item.item}
          key={item.item._id}
        />
      )}
    />
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
