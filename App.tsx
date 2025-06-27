import { StatusBar } from "react-native";
import RootStack from "./routes/RootStack";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <RootStack />
    </>
  );
}