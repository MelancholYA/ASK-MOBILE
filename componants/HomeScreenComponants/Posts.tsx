import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPosts, setPostsToDisplay } from "../../redux/slices/postsSlice";
import CustomText from "../Gloabls/CustomText";
import PostCard from "./PostCard";
import useFetch from "../../helpers/useFetch";
import { ActivityIndicator, Button } from "react-native-paper";

type Props = {};

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
  const [hasNextPage, sethasNextPage] = useState(true);
  const { postsToDisplay } = useSelector((state: RootState) => state.posts);

  const { clearData, data, getData, loading } = useFetch();

  useEffect(() => {
    getData("posts/" + page);
  }, [page]);

  useEffect(() => {
    console.log({ data });
    if (data) {
      dispatch(setPosts(data.data.posts));
      sethasNextPage(data.data.hasNextPage);
    }
  }, [data]);
  console.log(data);
  return (
    <FlatList
      ListEmptyComponent={<NoData text="No posts are available" />}
      ListFooterComponent={
        hasNextPage ? (
          <ActivityIndicator />
        ) : (
          <CustomText
            bold
            style={{ textAlign: "center", padding: 12 }}
          >
            No more questions
          </CustomText>
        )
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
