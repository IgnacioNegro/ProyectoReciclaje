import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputText from "../components/InputText.js";
import MyText from "../components/MyText.js";
import SingleButton from "../components/SingleButton.js";
const DeleteUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const DeleteUser = async () => {
    try {
      const user = await AsyncStorage.getItem(userName);

      if (user) {
        await AsyncStorage.removeItem(userName);
        alert("Usuario eliminado!");
        navigation.navigate("HomeScreen");
      } else {
        alert("Usuario no existe");
      }
    } catch (error) {
      Alert.alert("Error al eliminar el usuario");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText
              text="Buscar usuario a eliminar"
              style={styles.text}
            ></MyText>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUserName(text)}
              />
              <SingleButton title="Borrar usuario" customPress={DeleteUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
