import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { Appbar, Avatar, FAB, IconButton, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { texture } from "../../screens/Main screens/Welcome";
import CustomText from "../Gloabls/CustomText";

import { RootState } from "../../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Igroup, joinGroup, leaveGroup } from "../../redux/slices/groupsSlice";
import { RootStackParamList } from "../../navigation/Stack";

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
  const dispatch = useDispatch();
  const chip = useSelector((state: RootState) => state.chips.chips).filter(
    (chip) => chip.label === group.topic
  )[0];

  const join = () => {
    dispatch(joinGroup({ groupId: group.id }));
  };
  const leave = () => {
    dispatch(leaveGroup({ groupId: group.id }));
  };

  return (
    <ImageBackground
      source={group.background ? { uri: group.background } : texture}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.BackAction
            onPress={navigation.goBack}
            color="white"
            size={30}
          />
          <Avatar.Image
            style={styles.headerAvatar}
            size={50}
            source={group.avatar ? { uri: group.avatar } : texture}
          />
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
              {group.joined ? (
                <GroupMenu
                  leave={leave}
                  invite={() =>
                    navigation.navigate("InviteAfriend", { groupId: group.id })
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
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#000000b5",
  },
  header: {
    flexDirection: "row",
  },
  headerAvatar: {
    position: "absolute",
    width: 50,
    left: Dimensions.get("screen").width / 2 - 25,
  },
  body: { padding: 15 },
  BodyHeader: { flexDirection: "row", alignItems: "center" },
  right: {},
});
