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

import InputText from "../../components/InputText.js";
import MyText from "../../components/MyText.js";
import SingleButton from "../../components/SingleButton.js";

const DeleteReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");

  const deleteReto = async () => {
    const nombreBuscado = nombre.trim().toLowerCase();
    if (!nombreBuscado) {
      Alert.alert("Error", "Por favor ingresa el nombre del reto");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      const index = retos.findIndex(
        (r) => r.nombre.toLowerCase() === nombreBuscado
      );

      if (index === -1) {
        Alert.alert("Error", "No existe un reto con ese nombre");
        return;
      }

      // Eliminar el reto del array
      retos.splice(index, 1);

      // Guardar el array actualizado
      await AsyncStorage.setItem("retos", JSON.stringify(retos));

      Alert.alert("Éxito", "Reto eliminado correctamente", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo eliminar el reto");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <MyText text="Buscar reto a eliminar" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre del Reto"
                onChangeText={setNombre}
                value={nombre}
              />
              <SingleButton title="Borrar Reto" customPress={deleteReto} />
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
