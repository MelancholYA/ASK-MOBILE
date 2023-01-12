import { StyleSheet, FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPostsToDisplay } from "../../redux/slices/postsSlice";
import CustomText from "../Gloabls/CustomText";
import PostCard from "./PostCard";

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
      <CustomText variant="titleMedium">{text}</CustomText>
    </View>
  );
};

const Posts = (props: Props) => {
  const dispatch = useDispatch();
  const { postsToDisplay, posts } = useSelector(
    (state: RootState) => state.posts
  );
  const { homePageChips } = useSelector((state: RootState) => state.chips);

  useEffect(() => {
    dispatch(setPostsToDisplay(homePageChips));
  }, [homePageChips, posts]);

  return (
    <FlatList
      ListEmptyComponent={<NoData text="No posts are available" />}
      onEndReached={() => console.log("end")}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 10 }}
      scrollEnabled
      data={postsToDisplay}
      renderItem={(item) => (
        <PostCard
          post={item.item}
          key={item.item.id}
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
