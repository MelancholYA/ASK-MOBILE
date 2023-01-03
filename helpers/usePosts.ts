import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

import { setToken } from "../redux/slices/tokenSlice";
import useNotification from "./useNotification";
import { setPosts } from "../redux/slices/postsSlice";
import { errMessage } from "./useAuth";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const dispatch = useDispatch();

  const getPosts = () => {
    setLoading(true);
    axios
      .get(BASE_URL + "posts")
      .then((res) => {
        dispatch(setPosts(res.data.posts));
      })
      .catch((err) => openNotification(errMessage(err)))
      .finally(() => {
        setLoading(false);
      });
  };

  return { getPosts };
};

export default useAuth;
