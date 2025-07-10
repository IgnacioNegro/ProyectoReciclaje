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
  deleteRetoByTitulo,
  getRetoByTitulo,
} from "../../database/retoService"; // Ajusta la ruta según tu proyecto

const ViewReto = ({ navigation }) => {
  const [titulo, setTitulo] = useState("");
  const [retoData, setRetoData] = useState(null);

  const getRetoData = () => {
    const tituloTrim = titulo.trim().toLowerCase();

    if (!tituloTrim) {
      Alert.alert("Error", "Ingrese un título válido para buscar.");
      return;
    }

    try {
      const reto = getRetoByTitulo(tituloTrim); // síncrono

      if (reto) {
        setRetoData(reto);
      } else {
        Alert.alert("Reto no encontrado", `No existe el reto "${tituloTrim}"`);
        setRetoData(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al buscar el reto.");
    }
  };

  const limpiarBusqueda = () => {
    setTitulo("");
    setRetoData(null);
  };

  const eliminarReto = () => {
    if (!retoData) return;

    Alert.alert(
      "Eliminar reto",
      `¿Estás seguro/a de eliminar el reto "${retoData.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            try {
              deleteRetoByTitulo(retoData.titulo); // síncrono
              Alert.alert("Reto eliminado correctamente");
              limpiarBusqueda();
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
              placeholder="Ingrese título del reto"
              value={titulo}
              onChangeText={setTitulo}
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
                {retoData.imagen ? (
                  <Image
                    source={{ uri: retoData.imagen }}
                    style={styles.retoImage}
                  />
                ) : null}
                <MyText
                  text={`Título: ${retoData.titulo}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Descripción: ${retoData.descripcion}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Fecha Inicio: ${retoData.fechaInicio}`}
                  style={styles.resultText}
                />
                <MyText
                  text={`Fecha Fin: ${retoData.fechaFin}`}
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
  retoImage: {
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
