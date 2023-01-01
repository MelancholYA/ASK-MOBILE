import { Provider } from "react-redux";
import Main from "./Main";
import { store } from "./redux/store";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 1,

    colors: {
      ...DefaultTheme.colors,
      primary: "#14213D",
      secondary: "#FCA311",
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
