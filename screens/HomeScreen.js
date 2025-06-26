import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/Button.js";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogueado");
    Alert.alert("Sesión cerrada", "", [
      { text: "OK", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <Button
              title="USUARIOS"
              btnColor="black"
              btnIcon="users"
              customPress={() => navigation.navigate("UserMenu")}
            />
            <Button
              title="RETOS"
              btnColor="black"
              btnIcon="trophy"
              customPress={() => navigation.navigate("RetosMenu")}
            />
            <Button
              title="MATERIALES RECICLABLES"
              btnColor="black"
              btnIcon="recycle"
              customPress={() =>
                navigation.navigate("MaterialesReciclablesMenu")
              }
            />
          </ScrollView>
        </View>

        <View style={styles.logoutContainer}>
          <Button
            title="CERRAR SESIÓN"
            btnColor="red"
            btnIcon="sign-out" // <- aquí el cambio
            customPress={handleLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
  logoutContainer: {
    position: "absolute",
    bottom: 10,
    left: 100,
    right: 100,
  },
  logoutButton: {
    height: 80, // altura más visible
    borderRadius: 55,
  },
  logoutButtonText: {
    fontSize: 16,
  },
});
