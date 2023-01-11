import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import useAuth from "../../helpers/useAuth";
import AuthHeader from "../../componants/Gloabls/AuthHeader";
import CustomText from "../../componants/Gloabls/CustomText";

type Props = {};

const Register = (props: Props) => {
  const { register, loading } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView style={styles.container}>
      <AuthHeader />
      <View style={styles.subContainer}>
        <CustomText style={styles.subtitle}>Welcome aboard friend</CustomText>
        <TextInput
          value={userData.firstName}
          onChangeText={(e) => setUserData({ ...userData, firstName: e })}
          mode="outlined"
          label="First Name"
          theme={{ roundness: 6 }}
          outlineColor="#3D405B"
          activeOutlineColor="#FCA311"
          style={styles.input}
        />
        <TextInput
          value={userData.lastName}
          onChangeText={(e) => setUserData({ ...userData, lastName: e })}
          mode="outlined"
          label="Last Name"
          theme={{ roundness: 6 }}
          outlineColor="#3D405B"
          activeOutlineColor="#FCA311"
          style={styles.input}
        />
        <TextInput
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(e) => setUserData({ ...userData, email: e })}
          mode="outlined"
          label="Email"
          theme={{ roundness: 6 }}
          outlineColor="#3D405B"
          activeOutlineColor="#FCA311"
          style={styles.input}
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
          style={styles.input}
        />
        <Button
          icon="login"
          buttonColor="#3D405B"
          labelStyle={{ padding: 10 }}
          mode="contained"
          onPress={() => {
            register(userData);
          }}
          loading={loading}
        >
          Register
        </Button>
      </View>
    </ScrollView>
  );
};

export default Register;

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
  input: {
    backgroundColor: "white",
    marginBottom: 20,
  },
});
