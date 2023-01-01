import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";

const texture = require("../assets/texture.jpg");
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const Welcome = (props: Props) => {
  const theme = useTheme();
  const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.primary,
    },
    title: {
      fontFamily: "Montserrat-Black",
      fontSize: 120,
      color: theme.colors.secondary,
      marginTop: 130,
    },
    subtitle: {
      fontFamily: "Montserrat-Medium",
      fontSize: 18,
      width: "85%",
      color: "white",
      marginTop: 10,
      textAlign: "center",
    },
    background: {
      aspectRatio: 1.7,
      width: "100%",
      marginTop: "auto",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.title}>ASK</Text>
      <Text style={style.subtitle}>
        Find answers to your questions and make friends on the way
      </Text>
      <Button
        icon="login"
        mode="elevated"
        onPress={() => props.navigation.navigate("Login")}
        style={{
          width: "70%",
          marginBottom: 20,
          marginTop: "auto",
        }}
      >
        <Text style={{ fontFamily: "Montserrat-Medium" }}>LOGIN</Text>
      </Button>
      <Button
        icon="account-plus"
        mode="elevated"
        style={{ width: "70%" }}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ fontFamily: "Montserrat-Medium" }}>REGISTER</Text>
      </Button>
      <ImageBackground
        source={texture}
        resizeMode="cover"
        style={style.background}
      >
        <LinearGradient
          colors={[theme.colors.primary, "transparent"]}
          style={[style.background, { position: "absolute" }]}
        />
      </ImageBackground>
    </View>
  );
};

export default Welcome;
