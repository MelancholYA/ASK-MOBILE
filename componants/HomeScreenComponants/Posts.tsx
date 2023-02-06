import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPosts, setPostsToDisplay } from "../../redux/slices/postsSlice";
import CustomText from "../Gloabls/CustomText";
import PostCard from "./PostCard";
import useFetch from "../../helpers/useFetch";

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
  const dispatch = useDispatch();
  const { postsToDisplay } = useSelector((state: RootState) => state.posts);

  const { clearData, data, getData, loading } = useFetch();

  useEffect(() => {
    getData("posts");
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data.data.posts));
    }
  }, [data]);

  return (
    <FlatList
      ListEmptyComponent={<NoData text="No posts are available" />}
      onEndReached={() => console.log("end")}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 10 }}
      scrollEnabled
      data={postsToDisplay}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => getData("posts")}
        />
      }
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
