import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import useAuth from "../../helpers/useAuth";
import AuthHeader from "../../componants/AuthHeader";
import CustomText from "../../componants/CustomText";

type Props = {};

const Login = (props: Props) => {
  const { login, loading } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <AuthHeader />
      <View style={styles.subContainer}>
        <CustomText style={styles.subtitle}>Welcome back friend</CustomText>
        <TextInput
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(e) => setUserData({ ...userData, email: e })}
          mode="outlined"
          label="Email"
          theme={{ roundness: 6 }}
          outlineColor="#3D405B"
          activeOutlineColor="#FCA311"
          style={{
            backgroundColor: "white",
            marginBottom: 20,
            borderRadius: 3,
            borderColor: "red",
          }}
        />
        <TextInput
          value={userData.password}
          onChangeText={(e) => setUserData({ ...userData, password: e })}
          secureTextEntry
          label="Password"
          mode="outlined"
          outlineColor="#3D405B"
          activeOutlineColor="#FCA311"
          theme={{ roundness: 6 }}
          style={{ backgroundColor: "white", marginBottom: 20 }}
        />
        <Button
          icon="login"
          buttonColor="#3D405B"
          labelStyle={{ padding: 10 }}
          mode="contained"
          onPress={() => {
            login(userData.email, userData.password);
          }}
          loading={loading}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  subContainer: {
    marginTop: 30,
    padding: 20,
  },
  subtitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    marginBottom: 25,
  },
});
