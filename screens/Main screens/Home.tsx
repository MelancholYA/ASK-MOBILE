import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Filter from "../../componants/Gloabls/Filter";
import Posts from "../../componants/HomeScreenComponants/Posts";
import { ActivityIndicator, FAB } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Stack";
import useFetch from "../../helpers/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setPostsToDisplay } from "../../redux/slices/postsSlice";
import { RootState } from "../../redux/store";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const { homePageChips } = useSelector((state: RootState) => state.chips);
  const { posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(setPostsToDisplay(homePageChips));
  }, [homePageChips, posts]);

  return (
    <View style={style.container}>
      <Filter
        Case="homePageChips"
        shadow
      />
      <Posts />
      <FAB
        theme={{ roundness: 100 }}
        onPress={() => props.navigation.navigate("NewPost")}
        style={style.button}
        color="#FCA311"
        icon="fountain-pen-tip"
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  button: {
    position: "absolute",
    zIndex: 99,
    bottom: 20,
    right: 20,
    backgroundColor: "#14213D",
    borderWidth: 2,
    borderColor: "#FCA311",
  },
  loading: {
    flex: 1,
  },
});

export default Home;
