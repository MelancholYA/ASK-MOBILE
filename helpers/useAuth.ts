import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

import { setToken, setUser } from "../redux/slices/tokenSlice";
import useNotification from "./useNotification";

type Ilogin = (email: string, password: string) => void;
type IRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const checkEmail = (email: string) => {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email)) {
    return false;
  }
  return true;
};

export const errMessage = (error: any) => {
  if (error.response) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const dispatch = useDispatch();

  const login: Ilogin = (email, password) => {
    setLoading(true);
    console.log(BASE_URL);
    if (!email || !password) {
      openNotification("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (!checkEmail(email)) {
      openNotification("Email is not valid");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      openNotification("Password must be longer then 8 charecters");
      setLoading(false);
      return;
    }
    axios
      .post(BASE_URL + "users/login", {
        email,
        password,
      })
      .then(async (res) => {
        try {
          await AsyncStorage.setItem("voteAppToken", res.data.token);
          await AsyncStorage.setItem(
            "voteAppUserData",
            JSON.stringify(res.data.user)
          );
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.user));
          console.log({ res });
          setLoading(false);
        } catch (error) {
          console.log({ error });
          openNotification(errMessage(error));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openNotification(errMessage(err));
        setLoading(false);
      });
  };
  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: IRegister) => {
    setLoading(true);
    if (!email || !password || !firstName || !lastName) {
      openNotification("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (!checkEmail(email)) {
      openNotification("Email is not valid");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      openNotification("Password must be longer then 8 charecters");
      setLoading(false);
      return;
    }
    axios
      .post(BASE_URL + "users/new", { firstName, lastName, email, password })
      .then(async (res) => {
        try {
          await AsyncStorage.setItem("voteAppToken", res.data.token);
          await AsyncStorage.setItem("voteAppUserData", res.data.user);
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.user));
          setLoading(false);
        } catch (error) {
          openNotification(errMessage(error));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openNotification(errMessage(err));
        setLoading(false);
      });
  };

  return { login, register, loading };
};

export default useAuth;
