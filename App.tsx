import { useEffect } from "react";
import { StatusBar } from "react-native";
import { initRetoTable } from "../ObligatorioJM/database/retoService";
import { initDB } from "../ObligatorioJM/database/userService";
import RootStack from "./routes/RootStack";

export default function App() {
  useEffect(() => {
    initDB();           // crea tabla USUARIOS
    initRetoTable();    // crea tabla RETOS
   
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <RootStack />
    </>
  );
}
