import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import InputText from "../../components/InputText.js";
import SingleButton from "../../components/SingleButton.js";

const DeleteMaterialReciclable = ({ navigation }) => {
  const [nombreBuscar, setNombreBuscar] = useState("");
  const [materialEncontrado, setMaterialEncontrado] = useState(null);

  // Función para buscar el material por nombre
  const buscarMaterial = async () => {
    const clave = nombreBuscar.trim().toLowerCase();
    if (!clave) {
      Alert.alert("Error", "Por favor ingresa el nombre del material a buscar");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      const encontrado = materiales.find(
        (mat) => mat.nombre.toLowerCase() === clave
      );

      if (!encontrado) {
        Alert.alert("No encontrado", "No se encontró ningún material con ese nombre");
        setMaterialEncontrado(null);
        return;
      }

      setMaterialEncontrado(encontrado);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al buscar el material");
      console.error(error);
    }
  };
  
  const eliminarMaterial = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar el material "${materialEncontrado.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: eliminarConfirmado },
      ]
    );
  };
  
  const eliminarConfirmado = async () => {
    try {
      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      const nuevosMateriales = materiales.filter(
        (mat) => mat.nombre.toLowerCase() !== materialEncontrado.nombre.toLowerCase()
      );

      await AsyncStorage.setItem("materiales", JSON.stringify(nuevosMateriales));

      Alert.alert("Éxito", "Material reciclable eliminado");
      setMaterialEncontrado(null);
      setNombreBuscar("");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el material");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Buscar Material Reciclable</Text>
            <InputText
              placeholder="Nombre del material"
              value={nombreBuscar}
              onChangeText={setNombreBuscar}
              style={styles.input}
            />
            <SingleButton title="Buscar" customPress={buscarMaterial} />

            {materialEncontrado && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Nombre:</Text>
                <Text style={styles.resultValue}>{materialEncontrado.nombre}</Text>

                <Text style={styles.resultLabel}>Categoría:</Text>
                <Text style={styles.resultValue}>{materialEncontrado.categoria}</Text>

                {materialEncontrado.imagen ? (
                  <Image
                    source={{ uri: materialEncontrado.imagen }}
                    style={styles.image}
                  />
                ) : (
                  <Text style={{ fontStyle: "italic" }}>Sin imagen</Text>
                )}

                <SingleButton
                  title="Eliminar Material"
                  customPress={eliminarMaterial}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteMaterialReciclable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resultLabel: {
    fontWeight: "bold",
  },
  resultValue: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
});
