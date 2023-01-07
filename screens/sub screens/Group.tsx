import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppbarHeader } from "react-native-paper/lib/typescript/components/Appbar/AppbarHeader";
import { Appbar } from "react-native-paper";
import GroupHeader from "../../componants/GroupHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Main";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = NativeStackScreenProps<RootStackParamList, "Group">;

const Group = ({ route }: Props) => {
  const id = route.params.groupId;
  const group = useSelector((state: RootState) => state.groups.groups).filter(
    (group) => group.id === id
  )[0];

  return (
    <>
      <GroupHeader group={group} />
    </>
  );
};

export default Group;

const styles = StyleSheet.create({});
