import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Button, Chip, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Ichip, setHomePageChips } from "../redux/slices/chipsSlice";
import CustomText from "./CustomText";

type Props = {
  Case:
    | "homePageChips"
    | "newQuestionChips"
    | "groupFilterChips"
    | "newGroupChips";
};

const Filter = ({ Case }: Props) => {
  const chipsState = useSelector((state: RootState) => state.chips);
  const dispatch = useDispatch();

  const selected = (chip: Ichip) => {
    return chipsState[Case].map((chip) => chip.label).includes(chip.label);
  };

  return (
    <View style={style.shadow}>
      <View style={style.container}>
        {!chipsState.chips.length ? (
          <CustomText style={style.empty}>No filters available</CustomText>
        ) : (
          <>
            <CustomText>Filters :</CustomText>
            <ScrollView
              horizontal
              style={style.subContainer}
            >
              {chipsState.chips.map((chip) => (
                <Button
                  onPress={() => dispatch(setHomePageChips(chip))}
                  key={chip.label}
                  textColor={selected(chip) ? "#FF9E00" : "white"}
                  icon={chip.icon}
                  style={chipStyle.container}
                >
                  {chip.label}
                </Button>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

export const chipStyle = StyleSheet.create({
  container: {
    color: "red",
    marginRight: 5,
    backgroundColor: "#14213D",
  },
});
const style = StyleSheet.create({
  shadow: {
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9,
  },
  container: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: "#14213D22",
  },
  empty: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 10,
    overflow: "scroll",
    paddingBottom: 10,
  },
});

export default Filter;
