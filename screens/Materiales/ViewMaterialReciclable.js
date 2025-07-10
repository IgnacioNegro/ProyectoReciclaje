import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputText from "../../components/InputText";
import MyText from "../../components/MyText";
import SingleButton from "../../components/SingleButton";

import {
  deleteMaterialByNombre,
  getMaterialByNombre,
} from "../../database/materialService"; // Ajusta la ruta

const ViewMaterial = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [materialData, setMaterialData] = useState(null);

  const getMaterialData = async () => {
    const nombreTrim = nombre.trim().toLowerCase();

    if (!nombreTrim) {
      Alert.alert("Error", "Ingrese un nombre válido para buscar.");
      return;
    }

    try {
      const material = await getMaterialByNombre(nombreTrim);

      if (material) {
        setMaterialData(material);
      } else {
        Alert.alert(
          "Material no encontrado",
          `No existe el material "${nombreTrim}"`
        );
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

  const eliminarMaterial = () => {
    Alert.alert(
      "Eliminar material",
      `¿Estás seguro/a de eliminar el material "${materialData.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMaterialByNombre(materialData.nombre);

              Alert.alert("Material eliminado correctamente");
              limpiarBusqueda();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al eliminar el material");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
            <MyText text="Buscar Material Reciclable" style={styles.title} />

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
                {materialData.imagen ? (
                  <Image
                    source={{ uri: materialData.imagen }}
                    style={styles.materialImage}
                  />
                ) : null}
                <MyText
                  text={`Nombre: ${materialData.nombre}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Descripción: ${materialData.descripcion}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Categoría: ${materialData.categoria}`}
                  style={styles.resultText}
                />

                <SingleButton
                  title="Eliminar Material"
                  customPress={eliminarMaterial}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewMaterial;

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
  materialImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#444",
    textAlign: "center",
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
