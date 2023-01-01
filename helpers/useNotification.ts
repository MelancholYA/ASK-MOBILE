import { useDispatch } from "react-redux";
import { dismiss, show } from "../redux/slices/noteSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  const openNotification = (body: string) => dispatch(show(body));
  const dismissNote = () => dispatch(dismiss());

  return { openNotification, dismissNote };
};

export default useNotification;
