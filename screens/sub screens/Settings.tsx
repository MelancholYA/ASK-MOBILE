import { useDispatch } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logOut } from "../../redux/slices/tokenSlice";
import useNotification from "../../helpers/useNotification";

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
      <StatusBar backgroundColor="#f8faff" />
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
