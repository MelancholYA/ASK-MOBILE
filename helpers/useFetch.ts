import { RootState } from "./../redux/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BASE_URL } from "@env";
import axios from "axios";
import useNotification from "./useNotification";
import { errMessage } from "./useAuth";

const useFetch = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const { openNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const clearData = () => setData(null);

  const postData = (url: string, data: any, formdata?: boolean) => {
    const headers: any = {
      "x-auth-token": token,
    };
    if (formdata) {
      headers["Content-Type"] = "multipart/form-data";
    }

    setLoading(true);

    axios
      .post(BASE_URL + url, data, {
        headers: headers,
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log({ err });
        openNotification(errMessage(err));
      })
      .finally(() => setLoading(false));
  };
  const getData = (url: string) => {
    setLoading(true);
    axios
      .get(BASE_URL + url, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log({ res });
        setData(res);
      })
      .catch((err) => {
        console.log({ err });
        openNotification(errMessage(err));
      })
      .finally(() => setLoading(false));
  };

  return { postData, loading, data, clearData, getData };
};

export default useFetch;
