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

const DeleteMaterialReciclable = ({ navigation }) => {
  const [nombreMaterial, setNombreMaterial] = useState("");

  const DeleteMaterial = async () => {
    try {
      const claveValor = nombreMaterial.trim().toLowerCase();
      const material = await AsyncStorage.getItem(claveValor);

      if (material) {
        await AsyncStorage.removeItem(claveValor);
        alert("Material reciclable eliminado!");
        navigation.navigate("HomeScreen");
      } else {
        alert("Material reciclable no existe");
      }
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
            ></MyText>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <InputText
                placeholder="Nombre del material reciclable"
                onChangeText={(text) => setNombreMaterial(text)}
              />
              <SingleButton
                title="Borrar Material"
                customPress={DeleteMaterial}
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
