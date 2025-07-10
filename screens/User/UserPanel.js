import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyText from "../../components/MyText";
import { getParticipationsByUser } from "../../database/participationService";

const UserPanel = () => {
  const [userName, setUserName] = useState("");
  const [participaciones, setParticipaciones] = useState([]);

  useEffect(() => {
    const loadUserAndParticipations = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuarioLogueado");
        if (!storedUser) {
          Alert.alert("Error", "No se encontró el usuario logueado.");
          return;
        }
        setUserName(storedUser);

        const data = await getParticipationsByUser(storedUser);
        setParticipaciones(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar las participaciones del usuario.");
      }
    };

    loadUserAndParticipations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <MyText text={`Reto ID: ${item.retoId}`} style={styles.retoText} />
      <MyText
        text={`Fecha: ${new Date(item.fecha).toLocaleDateString()}`}
        style={styles.fechaText}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel del Usuario</Text>
        <Text style={styles.subTitle}>Usuario: {userName}</Text>
      </View>

      <FlatList
        data={participaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay participaciones registradas.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default UserPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: "#e1f5fe",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  retoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0277bd",
  },
  fechaText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
});
