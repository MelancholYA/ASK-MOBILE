import Login from "../screens/Main screens/Login";
import Register from "../screens/Main screens/Register";
import Welcome from "../screens/Main screens/Welcome";
import { StackType } from "./Stack";

interface Props {
  Stack: StackType;
}

const authScreens = ({ Stack }: Props) => {
  return (
    <>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
    </>
  );
};

export default authScreens;
