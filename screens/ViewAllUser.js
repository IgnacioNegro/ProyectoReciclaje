import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import MyText from "../components/MyText.js";

const ViewAllUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const usersList = result.map((req) => JSON.parse(req[1]));
        if (usersList.length > 0) {
          setUsers(usersList);
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
        <MyText text="Nombre de usuario: " style={styles.text} />
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
});
