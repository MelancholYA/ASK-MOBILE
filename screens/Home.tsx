import { View, StyleSheet } from "react-native";
import React from "react";
import Filter from "../componants/Filter";
import Posts from "../componants/Posts";

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={style.container}>
      <Filter Case="homePageChips" />
      <Posts />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
});

export default Home;
