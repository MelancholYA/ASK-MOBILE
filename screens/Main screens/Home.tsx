import { View, StyleSheet } from "react-native";
import React from "react";
import Filter from "../../componants/Gloabls/Filter";
import Posts from "../../componants/HomeScreenComponants/Posts";
import { FAB } from "react-native-paper";
import { RootStackParamList } from "../../Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home = (props: Props) => {
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
});

export default Home;
