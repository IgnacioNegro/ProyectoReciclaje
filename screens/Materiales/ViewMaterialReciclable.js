import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import InputText from "../../components/InputText";
import MyText from "../../components/MyText";
import SingleButton from "../../components/SingleButton";

const ViewMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [materialData, setMaterialData] = useState(null);

  const getMaterialData = async () => {
    const nombreTrim = nombre.trim().toLowerCase();

    if (!nombreTrim) {
      Alert.alert("Error", "Ingrese un nombre valido para buscar.");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      const material = materiales.find(
        (mat) => mat.nombre.toLowerCase() === nombreTrim
      );

      if (material) {
        setMaterialData(material);
      } else {
        Alert.alert("Material no encontrado", `No existe "${nombreTrim}"`);
        setMaterialData(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el material.");
    }
  };

  const limpiarBusqueda = () => {
    setNombre("");
    setMaterialData(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
            <MyText
              text="Buscar Material Reciclable"
              style={styles.title}
            />

            <InputText
              style={styles.input}
              placeholder="Ingrese nombre del material"
              value={nombre}
              onChangeText={setNombre}
            />

            <View style={styles.buttonGroup}>
              <SingleButton title="Buscar" customPress={getMaterialData} />
              {materialData && (
                <TouchableOpacity onPress={limpiarBusqueda}>
                  <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
              )}
            </View>

            {materialData && (
              <View style={styles.resultContainer}>
                <MyText
                  text={`Nombre: ${materialData.nombre}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Categoría: ${materialData.categoria}`}
                  style={styles.resultText}
                />
                <Image
                  source={{ uri: materialData.imagen }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewMaterialReciclable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  keyboardView: {
    flex: 1,
  },
  resultContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#444",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearText: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
});
