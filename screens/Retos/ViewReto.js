import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
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

const ViewReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [retoData, setRetoData] = useState(null);

  const getRetoData = async () => {
    const nombreTrim = nombre.trim().toLowerCase();

    if (!nombreTrim) {
      Alert.alert("Error", "Ingrese un nombre válido para buscar.");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      const retoEncontrado = retos.find(
        (r) => r.nombre.toLowerCase() === nombreTrim
      );

      if (retoEncontrado) {
        setRetoData(retoEncontrado);
      } else {
        Alert.alert("Reto no encontrado", `No existe "${nombreTrim}"`);
        setRetoData(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el reto.");
    }
  };

  const limpiarBusqueda = () => {
    setNombre("");
    setRetoData(null);
  };

  const eliminarReto = () => {
    Alert.alert(
      "Eliminar reto",
      `¿Estás segura/o de eliminar "${retoData.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem("retos");
              let retos = data ? JSON.parse(data) : [];

              retos = retos.filter(
                (r) => r.nombre.toLowerCase() !== retoData.nombre.toLowerCase()
              );

              await AsyncStorage.setItem("retos", JSON.stringify(retos));

              Alert.alert("Reto eliminado correctamente");
              limpiarBusqueda();
              navigation.navigate("HomeScreen");
            } catch (error) {
              console.error(error);
              Alert.alert("Error al eliminar el reto");
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
            <MyText text="Buscar Reto" style={styles.title} />

            <InputText
              style={styles.input}
              placeholder="Ingrese nombre del reto"
              value={nombre}
              onChangeText={setNombre}
            />

            <View style={styles.buttonGroup}>
              <SingleButton title="Buscar" customPress={getRetoData} />
              {retoData && (
                <TouchableOpacity onPress={limpiarBusqueda}>
                  <Text style={styles.clearText}>Limpiar</Text>
                </TouchableOpacity>
              )}
            </View>

            {retoData && (
              <View style={styles.resultContainer}>
                <MyText
                  text={`Nombre: ${retoData.nombre}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Descripción: ${retoData.descripcion}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Categoría: ${retoData.categoria}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Fecha Límite: ${retoData.fechaLimite}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Puntaje Asignado: ${retoData.puntajeAsignado}`}
                  style={styles.resultText}
                />

                <SingleButton
                  title="Eliminar Reto"
                  customPress={eliminarReto}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewReto;

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
