import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Appbar, Avatar, FAB, IconButton, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { texture } from "../../screens/Main screens/Welcome";
import CustomText from "../Gloabls/CustomText";

import { RootState } from "../../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Igroup, joinGroup, leaveGroup } from "../../redux/slices/groupsSlice";
import { RootStackParamList } from "../../navigation/Stack";
import CustomImageBackground from "../Gloabls/CustomImageBackground";
import { BASE_URL } from "@env";
import useFetch from "../../helpers/useFetch";

type Props = {
  group: Igroup;
  navigation: NativeStackNavigationProp<RootStackParamList, "Group", undefined>;
};

const GroupMenu = ({
  leave,
  invite,
}: {
  leave: () => void;
  invite: () => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Menu
      visible={visible}
      anchorPosition="bottom"
      contentStyle={{
        transform: [{ translateX: -30 }],
        padding: 5,
        borderRadius: 5,
      }}
      onDismiss={() => setVisible(false)}
      anchor={
        <FAB
          color="black"
          style={{ backgroundColor: "white", margin: 5 }}
          customSize={40}
          icon={visible ? "close-thick" : "dots-vertical"}
          onPress={() => setVisible(true)}
        />
      }
    >
      <Menu.Item
        dense={true}
        onPress={() => {
          setVisible(false);
          invite();
        }}
        title="Invite a friend"
      />
      <Menu.Item
        onPress={leave}
        title="Leave group"
      />
    </Menu>
  );
};

const GroupHeader = ({ group, navigation }: Props) => {
  const { clearData, data, postData, loading } = useFetch();
  const dispatch = useDispatch();
  const chip = useSelector((state: RootState) => state.chips.chips).filter(
    (chip) => chip.label === group.topic
  )[0];

  const join = () => {
    postData("groups/" + group._id + "/join", null);
  };
  const leave = () => {
    postData("groups/" + group._id + "/leave", null);
  };

  useEffect(() => {
    if (data) {
      if (data.data.group.joined) {
        dispatch(joinGroup({ groupId: group._id }));
      } else {
        dispatch(leaveGroup({ groupId: group._id }));
      }
    }
    clearData();
  }, [data]);

  return (
    <ImageBackground
      source={
        group.cover
          ? { uri: BASE_URL.replace("/api/", "") + group.cover }
          : texture
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.BackAction
            onPress={navigation.goBack}
            color="white"
            size={30}
          />
          <View style={styles.avatarContainer}>
            <CustomImageBackground
              style={styles.headerAvatar}
              source={
                group.avatar
                  ? { uri: BASE_URL.replace("/api/", "") + group.avatar }
                  : texture
              }
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.BodyHeader}>
            <CustomText
              variant="headlineSmall"
              color="white"
            >
              {group.name}
            </CustomText>
            <IconButton
              icon={chip.icon}
              mode="outlined"
              iconColor="white"
              size={15}
            />
            <View style={{ marginLeft: "auto" }}>
              {loading ? (
                <ActivityIndicator />
              ) : group.joined ? (
                <GroupMenu
                  leave={leave}
                  invite={() =>
                    navigation.navigate("InviteAfriend", { groupId: group._id })
                  }
                />
              ) : (
                <IconButton
                  icon="account-plus"
                  mode="contained"
                  containerColor="white"
                  onPress={join}
                  size={20}
                />
              )}
            </View>
          </View>
          <CustomText
            variant="bodySmall"
            color="white"
          >
            {group.description}
          </CustomText>
        </View>
      </View>
    </ImageBackground>
  );
};

export default GroupHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000b5",
  },
  header: {
    flexDirection: "row",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    width: "100%",
  },
  headerAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  body: { padding: 15 },
  BodyHeader: { flexDirection: "row", alignItems: "center" },
  right: {},
});
