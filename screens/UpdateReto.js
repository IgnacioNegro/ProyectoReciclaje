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
import InputText from "../components/InputText.js";
import MyText from "../components/MyText.js";
import SingleButton from "../components/SingleButton.js";

const UpdateReto = () => {
  const [nombreBusqueda, setNombreBusqueda] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaLimite, setFechaFin] = useState("");
  const [puntajeAsignado, setPuntajeAsignado] = useState("");

  const searchReto = async () => {
    console.log("searchReto");
    if (!nombreBusqueda.trim()) {
      Alert.alert("El nombre del reto es requerido!");
      return;
    }

    try {
      const reto = await AsyncStorage.getItem(nombreBusqueda);
      if (reto) {
        const retoData = JSON.parse(reto);
        setNombre(retoData.nombre);
        setDescripcion(retoData.descripcion);
        setCategoria(retoData.categoria);
        setFechaFin(retoData.fechaLimite);
        setPuntajeAsignado(retoData.puntajeAsignado);
      } else {
        Alert.alert("Reto no encontrado!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar Reto.");
    }
  };

  const updateReto = async () => {
    console.log("updateReto");

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !categoria.trim() ||
      !fechaLimite.trim() ||
      !puntajeAsignado.trim()
    ) {
      Alert.alert("Por favor completa todos los campos");
      return;
    }

    try {
      const reto = {
        nombre,
        descripcion,
        categoria,
        fechaLimite,
        puntajeAsignado,
      };
      await AsyncStorage.setItem(nombre, JSON.stringify(reto));
      Alert.alert("Reto actualizado");
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar el reto.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding">
              <MyText text="Buscar Reto" style={styles.text} />
              <InputText
                placeholder="Ingrese el nombre del Reto a buscar"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreBusqueda(text)}
              />

              <SingleButton title="Buscar" customPress={searchReto} />
              <InputText
                placeholder="Ingrese la descripcion del reto"
                value={descripcion}
                onChangeText={(text) => setDescripcion(text)}
              />

              <InputText
                placeholder="Ingrese el nombre de  la categoria"
                value={categoria}
                onChangeText={(text) => setCategoria(text)}
              />
              <InputText
                placeholder="Ingrese la fecha limite"
                value={fechaLimite}
                onChangeText={(text) => setFechaFin(text)}
              />

              <InputText
                placeholder="Ingrese el puntaje asignado"
                value={puntajeAsignado}
                onChangeText={(text) => setPuntajeAsignado(text)}
              />
              <SingleButton title="Actualizar" customPress={updateReto} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateReto;

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
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
