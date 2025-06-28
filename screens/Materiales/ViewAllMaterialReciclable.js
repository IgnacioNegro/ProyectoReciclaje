import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../../components/MyText.js";

const ViewAllMaterialReciclable = ({ navigation }) => {
  const [materiales, setMateriales] = useState([]);
  const [imagen, setImagenes] = useState([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const data = await AsyncStorage.getItem("materiales");
        const materialesList = data ? JSON.parse(data) : [];

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

  const clearMaterials = () => {
    Alert.alert(
      "Confirmar",
      "¿Seguro que quieres borrar todos los materiales reciclables? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, borrar todo",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("materiales");
              setMateriales([]); // Limpia la lista en pantalla
              Alert.alert("Materiales reciclables borrados correctamente");
              navigation.navigate("HomeScreen");
            } catch (e) {
              console.error("Error borrando materiales reciclables:", e);
              Alert.alert("Error al borrar materiales reciclables");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const listItemView = (item) => {
    return (
      <View key={item.nombre} style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <MyText
            text={`Material: ${item.nombre}`}
            style={styles.cardText}
          />
          <MyText
            text={`Categoría: ${item.categoria}`}
            style={styles.cardText}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={materiales}
          keyExtractor={(item) => item.nombre}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay materiales para mostrar."
              style={{ textAlign: "center", marginTop: 20 }}
            />
          }
        />

        <View style={styles.listView}>
          <MyText
            text="Total de Materiales Reciclables: "
            style={styles.text}
          />
          <MyText text={materiales.length.toString()} style={styles.text} />
        </View>

        <View style={styles.clearButtonContainer}>
          <Button
            title="Borrar todos los materiales reciclables"
            color="red"
            onPress={clearMaterials}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMaterialReciclable;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  cardContent: {
    padding: 10,
  },

  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  clearButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

