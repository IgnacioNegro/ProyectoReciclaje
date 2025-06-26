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
} from "react-native";
import InputText from "../../components/InputText";
import MyText from "../../components/MyText";
import SingleButton from "../../components/SingleButton";

const ViewMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [materialData, setMaterialData] = useState(null);

  const getMaterialData = async () => {
    if (!nombre.trim()) {
      Alert.alert("El nombre del material es requerido!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("materiales");
      const materiales = data ? JSON.parse(data) : [];

      // Buscar material por nombre (ignorando mayúsculas/minúsculas)
      const material = materiales.find(
        (mat) => mat.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );

      if (material) {
        setMaterialData(material);
      } else {
        Alert.alert("El material no existe");
        setMaterialData(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar material reciclable");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText
                text="Filtro de materiales reciclables"
                style={styles.text}
              />
              <InputText
                style={styles.inputStyle}
                placeholder="Nombre del material a buscar"
                onChangeText={(text) => setNombre(text)}
                value={nombre}
              />

              <SingleButton title="Buscar" customPress={getMaterialData} />

              <View style={styles.presenterView}>
                <MyText
                  text={`Nombre: ${!materialData ? "" : materialData.nombre}`}
                  style={styles.presenterText}
                />
                <MyText
                  text={`Categoría: ${
                    !materialData ? "" : materialData.categoria
                  }`}
                  style={styles.presenterText}
                />
                {materialData && materialData.imagen ? (
                  <Image
                    source={{ uri: materialData.imagen }}
                    style={styles.imageStyle}
                    resizeMode="contain"
                  />
                ) : null}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewMaterialReciclable;

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
  presenterView: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
  },
  presenterText: {
    fontSize: 20,
    marginBottom: 10,
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  keyboardView: {
    flex: 1,
  },
});
