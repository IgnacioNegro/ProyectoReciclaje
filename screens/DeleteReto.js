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

const DeleteReto = ({ navigation }) => {
  const [nombre, setReto] = useState("");

  const DeleteReto = async () => {
    try {
      const reto = await AsyncStorage.getItem(nombre);

      if (reto) {
        await AsyncStorage.removeItem(nombre);
        alert("Reto eliminado!");
        navigation.navigate("HomeScreen");
      } else {
        alert("Reto no existe");
      }
    } catch (error) {
      Alert.alert("Error al eliminar el reto");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Buscar reto a eliminar" style={styles.text}></MyText>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre del Reto"
                onChangeText={(text) => setReto(text)}
              />
              <SingleButton title="Borrar Reto" customPress={DeleteReto} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteReto;

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
