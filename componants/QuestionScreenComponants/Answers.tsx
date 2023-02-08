import { StyleSheet, Text, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../helpers/useFetch";
import { useDispatch } from "react-redux";
import { addAnswers, clearAnswers, Ipost } from "../../redux/slices/postsSlice";
import { ActivityIndicator } from "react-native-paper";
import { NoData } from "../HomeScreenComponants/Posts";
import CustomText from "../Gloabls/CustomText";
import AnswerCard from "./AnswerCard";

type Props = {
  post: Ipost;
};

//todo resplies

const Answers = ({ post }: Props) => {
  const { clearData, data, getData, loading } = useFetch();
  const [page, setPage] = useState(1);
  const [hasNextPage, sethasNextPage] = useState(false);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const refresh = () => {
    dispatch(clearAnswers({ postId: post._id }));
    setPage(1);
    getData("posts/" + post._id + "/answers/" + 1);
  };
  useEffect(() => {
    getData("posts/" + post._id + "/answers/" + page);
    return () => {
      clearData();
    };
  }, [page]);

  useEffect(() => {
    if (firstRender.current) {
      if (data) {
        sethasNextPage(data.data.hasNextPage);
        dispatch(addAnswers({ answers: data.data.answers, postId: post._id }));
      }
    } else {
      firstRender.current = false;
    }
  }, [data, dispatch]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refresh}
        />
      }
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <NoData text="No one answered yet" />
        )
      }
      listKey="1"
      style={styles.answers}
      ListFooterComponent={
        post.answers?.length ? (
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
          setPage((prev) => prev + 1);
        }
      }}
      renderItem={(item) => (
        <AnswerCard
          postId={post._id}
          data={item.item}
          key={item.item._id}
        />
      )}
      data={post.answers}
    />
  );
};

export default Answers;

const styles = StyleSheet.create({
  answers: {
    padding: 10,
    paddingHorizontal: 20,
    minHeight: 50,
    overflow: "hidden",
  },
});
