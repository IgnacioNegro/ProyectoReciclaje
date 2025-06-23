import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import MyText from "../components/MyText.js";

const ViewAllRetos = ({ navigation }) => {
  const [retos, setRetos] = useState([]);

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const retosList = result.map((req) => JSON.parse(req[1]));
        if (retosList.length > 0) {
          setRetos(retosList);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Retos!!!",
            [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar retos!");
      }
    };
    fetchRetos();
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.retos} style={styles.listItemView}>
        <MyText text="Nombre del Reto: " style={styles.text} />
        <MyText text={item.nombre} style={styles.text} />
        <MyText text="Descripción: " style={styles.text} />
        <MyText text={item.descripcion} style={styles.text} />
        <MyText text="Categoría: " style={styles.text} />
        <MyText text={item.categoria} style={styles.text} />
        <MyText text="Fecha Límite: " style={styles.text} />
        <MyText text={item.fechaLimite} style={styles.text} />
        <MyText text="Puntaje Asignado: " style={styles.text} />
        <MyText text={item.puntajeAsignado} style={styles.text} />
        <MyText text="------------------------" style={styles.text} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={retos}
            keyExtractor={(item) => item.nombre}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllRetos;

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
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
});
