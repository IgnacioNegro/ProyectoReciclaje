import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import MyText from "../components/MyText.js";

const ViewAllMaterialReciclable = ({ navigation }) => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const materialesList = result.map((req) => JSON.parse(req[1]));
        if (materialesList.length > 0) {
          setMateriales(materialesList);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Materiales Reciclables!!!",
            [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar materiales reciclables!");
      }
    };
    fetchMateriales();
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.materiales} style={styles.listItemView}>
        <MyText text="Nombre del Material:" style={styles.text} />
        <MyText text={item.nombre} style={styles.text} />
        <MyText text="Categoría: " style={styles.text} />
        <MyText text={item.categoria} style={styles.text} />
        <MyText text="Imagen: " style={styles.text} />
        <MyText text={item.imagen} style={styles.text} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={materiales}
            keyExtractor={(item) => item.nombre}
            renderItem={({ item }) => listItemView(item)}
          />

          <View style={styles.listView}>
            <MyText
              text="Total de Materiales Reciclables: "
              style={styles.text}
            />
            <MyText text={materiales.length} style={styles.text} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMaterialReciclable;

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
