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
import InputText from "../components/InputText";
import MyText from "../components/MyText";
import SingleButton from "../components/SingleButton";

const ViewMaterialReciclable = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [materialData, setmaterialData] = useState(null);

  const getMaterialData = async () => {
    if (!nombre.trim()) {
      Alert.alert("El nombre del material es requerido!");
      return;
    }

    try {
      const claveValor = nombre.trim().toLowerCase();
      const materialData = await AsyncStorage.getItem(claveValor);

      if (materialData) {
        setmaterialData(JSON.parse(materialData));
      } else {
        Alert.alert("El material no existe");
        setmaterialData(null);
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
              />

              <SingleButton title="Buscar" customPress={getMaterialData} />
              <View style={styles.presenterView}>
                <MyText
                  text={`Nombre: ${!materialData ? "" : materialData.nombre}`}
                  style={styles.presenterText}
                />
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
    fontSize: 30,
  },
  presenterText: {
    fontSize: 20,
  },
});
