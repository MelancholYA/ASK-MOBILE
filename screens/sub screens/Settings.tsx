import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useNotification from "../../helpers/useNotification";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/slices/tokenSlice";

type Props = {};

const Settings = (props: Props) => {
  const { openNotification } = useNotification();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("voteAppToken");
      await AsyncStorage.removeItem("voteAppUserData");
    } catch (error) {
      openNotification("something went wrong");
    } finally {
      dispatch(logOut());
    }
  };
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="logout-variant"
        onPress={handleLogout}
      >
        Log out
      </Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
