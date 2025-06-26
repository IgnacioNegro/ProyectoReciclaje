import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../../components/MyText.js";

const ViewAllUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usuarios = await AsyncStorage.getItem("usuarios");
        const parsedUsuarios = usuarios ? JSON.parse(usuarios) : [];
        console.log("usuarios", parsedUsuarios);
        if (parsedUsuarios.length > 0) {
          setUsers(parsedUsuarios);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error al cargar usuarios!");
      }
    };
    fetchUsers();
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.userName} style={styles.listItemView}>
        {/* Imagen de perfil */}
        {item.profilePicture ? (
          <Image
            source={{ uri: item.profilePicture }}
            style={styles.profileImage}
          />
        ) : null}

        <MyText text={item.userName} style={styles.text} />
        <MyText text="Email de usuario: " style={styles.text} />
        <MyText text={item.email} style={styles.text} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={users}
            keyExtractor={(item) => item.userName}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUsers;

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

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
});
