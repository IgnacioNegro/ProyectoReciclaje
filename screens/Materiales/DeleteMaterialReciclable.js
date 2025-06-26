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

const DeleteMaterialReciclable = ({ navigation }) => {
  const [nombreMaterial, setNombreMaterial] = useState("");

  const deleteMaterial = async () => {
    try {
      const claveValor = nombreMaterial.trim().toLowerCase();

      if (!claveValor) {
        Alert.alert(
          "Error",
          "Por favor ingresa el nombre del material reciclable"
        );
        return;
      }

      // Obtener el array de materiales
      const data = await AsyncStorage.getItem("materiales");
      let materiales = data ? JSON.parse(data) : [];

      // Buscar índice del material a eliminar
      const index = materiales.findIndex(
        (mat) => mat.nombre.toLowerCase() === claveValor
      );

      if (index === -1) {
        Alert.alert("Error", "Material reciclable no existe");
        return;
      }

      // Eliminar material del array
      materiales.splice(index, 1);

      // Guardar el array actualizado
      await AsyncStorage.setItem("materiales", JSON.stringify(materiales));

      Alert.alert("Éxito", "Material reciclable eliminado!");
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error al eliminar el material reciclable");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText
              text="Buscar material reciclable a eliminar"
              style={styles.text}
            />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre del material reciclable"
                onChangeText={(text) => setNombreMaterial(text)}
                value={nombreMaterial}
              />
              <SingleButton
                title="Borrar Material"
                customPress={deleteMaterial}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteMaterialReciclable;

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
