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

const ViewReto = ({ navigation }) => {
  const [nombre, setReto] = useState("");
  const [retoData, setRetoData] = useState(null);

  const getRetoData = async () => {
    setRetoData(null);
    if (!nombre.trim()) {
      Alert.alert("El nombre del Reto es requerido!");
      return;
    }

    try {
      const claveValor = nombre.trim().toLowerCase();
      const reto = await AsyncStorage.getItem(claveValor);
      if (reto) {
        setRetoData(JSON.parse(reto));
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
                onChangeText={(text) => setReto(text)}
              />
              <SingleButton title="Buscar" customPress={getRetoData} />
              <View style={styles.presenterView}>
                <MyText
                  text={`Nombre: ${!retoData ? "" : retoData.nombre}`}
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
