import { StyleSheet, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";

type Props = {};

const texture = require("../assets/texture.jpg");

const AuthHeader = (props: Props) => {
  return (
    <>
      <ImageBackground
        source={texture}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={["transparent", "white"]}
          style={[styles.background]}
        />
      </ImageBackground>
      <Text style={styles.title}>ASK</Text>
    </>
  );
};

const styles = StyleSheet.create({
  background: { position: "absolute", aspectRatio: 1.7, width: "100%" },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 100,
    color: "#14213D",
    marginTop: 130,
    textAlign: "center",
  },
});

export default AuthHeader;
