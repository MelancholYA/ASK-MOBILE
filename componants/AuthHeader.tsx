import { StyleSheet, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import CustomText from "./CustomText";

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
      <CustomText style={styles.title}>ASK</CustomText>
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
