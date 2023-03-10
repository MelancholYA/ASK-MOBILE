import React from "react";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import { NoData } from "../../componants/HomeScreenComponants/Posts";
import FriendCard from "../../componants/InviteFriendScreenComponant/FriendCard";

import { RootState } from "../../redux/store";
import { RootStackParamList } from "../../navigation/Stack";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "InviteAfriend"> {}

const InviteFriend = ({ navigation, route }: Props) => {
  const { groupId } = route.params;
  const { user } = useSelector((state: RootState) => state.token);
  let selected: string[] = [];
  const remove = (id: string) => {
    let temp = selected.filter((item) => item !== id);
    selected = temp;
  };

  const submit = () => {
    console.log({ groupId, selected });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <FlatList
        data={user?.friends}
        ListEmptyComponent={<NoData text="You don't have any friends yet" />}
        renderItem={(item) => (
          <FriendCard
            data={item.item}
            remove={() => remove(item.item.id)}
            add={() => selected.push(item.item.id)}
          />
        )}
      />
      <Button
        mode="contained"
        textColor="#FCA311"
        style={styles.button}
        onPress={submit}
      >
        Invite
      </Button>
    </View>
  );
};

export default InviteFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    padding: 5,
  },
});
