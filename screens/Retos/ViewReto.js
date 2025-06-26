import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import InputText from "../../components/InputText";
import MyText from "../../components/MyText";
import SingleButton from "../../components/SingleButton";

const ViewReto = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [retoData, setRetoData] = useState(null);

  const getRetoData = async () => {
    setRetoData(null);
    if (!nombre.trim()) {
      Alert.alert("El nombre del Reto es requerido!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("retos");
      const retos = data ? JSON.parse(data) : [];

      // Buscar reto por nombre (ignorando mayúsculas/minúsculas)
      const retoEncontrado = retos.find(
        (r) => r.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );

      if (retoEncontrado) {
        setRetoData(retoEncontrado);
      } else {
        Alert.alert("El reto no existe");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar reto");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de retos" style={styles.text} />
              <InputText
                style={styles.inputStyle}
                placeholder="Nombre del Reto a buscar"
                onChangeText={setNombre}
                value={nombre}
              />
              <SingleButton title="Buscar" customPress={getRetoData} />
              {retoData && (
                <View style={styles.presenterView}>
                  <MyText
                    text={`Nombre: ${retoData.nombre}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`Descripción: ${retoData.descripcion}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`Categoría: ${retoData.categoria}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`Fecha Límite: ${retoData.fechaLimite}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`Puntaje Asignado: ${retoData.puntajeAsignado}`}
                    style={styles.presenterText}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewReto;

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
  inputStyle: {
    padding: 15,
    margin: 10,
    color: "black",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-start",
  },
  presenterView: {
    marginTop: 15,
    marginHorizontal: 30,
  },
  presenterText: {
    fontSize: 18,
    marginVertical: 4,
  },
});
