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

const ViewUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    console.log("getUserData");

    setUserData(null);
    if (!userName.trim()) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }

    try {
      const user = await AsyncStorage.getItem(userName);
      if (user) {
        setUserData(JSON.parse(user));
      } else {
        Alert.alert("El usuario no existe");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar usuario");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de usuario" style={styles.text} />
              <InputText
                style={styles.inputStyle}
                placeholder="Nombre de usuario a buscar"
                onChangeText={(text) => setUserName(text)}
              />
              <SingleButton title="Buscar" customPress={getUserData} />
              <View style={styles.presenterView}>
                <MyText
                  text={`Email: ${!userData ? "" : userData.email}`}
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

export default ViewUser;

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
