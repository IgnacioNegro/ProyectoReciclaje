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

import { deleteUser, getAllUsers } from "../../database/userService.js"; // Ajustar ruta

const ViewAllUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usuarios = await getAllUsers(); // Trae array de usuarios desde SQLite

      if (usuarios.length > 0) {
        setUsers(usuarios);
      } else {
        Alert.alert(
          "Mensaje",
          "No hay usuarios",
          [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al cargar usuarios!");
    }
  };

  const eliminarUsuario = (userName) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que querés eliminar al usuario "${userName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser(userName); // Elimina en SQLite
              await fetchUsers(); // Refresca la lista
              Alert.alert("Usuario eliminado correctamente");
            } catch (error) {
              console.error(error);
              Alert.alert("Error al eliminar el usuario");
            }
          },
        },
      ]
    );
  };

  const listItemView = (item) => (
    <View key={item.userName} style={styles.listItemView}>
      {item.profilePicture ? (
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.profileImage}
        />
      ) : null}

      <MyText text={item.userName} style={styles.userName} />
      <MyText text="Email de usuario:" style={styles.label} />
      <MyText text={item.email} style={styles.text} />

      <View style={styles.buttonContainer}>
        <Button
          title="Eliminar"
          color="red"
          onPress={() => eliminarUsuario(item.userName)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={users}
          keyExtractor={(item) => item.userName}
          renderItem={({ item }) => listItemView(item)}
          ListEmptyComponent={
            <MyText
              text="No hay usuarios para mostrar."
              style={styles.emptyText}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUsers;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "white" },
  listItemView: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  label: {
    fontWeight: "bold",
    color: "black",
  },
  text: {
    marginTop: 2,
    color: "black",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
  buttonContainer: {
    marginTop: 10,
    width: "80%",
  },
});
