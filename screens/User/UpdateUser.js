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
import InputText from "../../components/InputText.js";
import MyText from "../../components/MyText.js";
import SingleButton from "../../components/SingleButton.js";

const UpdateUser = () => {
  const [userNameSearch, setUserNameSearch] = useState("");
  const [arrayUsuarios, setArrayUsuarios] = useState([]);
  const [originalUserName, setOriginalUserName] = useState("");

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const clearForm = () => {
    setUserNameSearch("");
    setOriginalUserName("");
    setUserName("");
    setName("");
    setAge("");
    setNeighborhood("");
    setProfilePicture("");
    setPassword("");
    setEmail("");
    setArrayUsuarios([]);
  };

  const searchUser = async () => {
    if (!userNameSearch.trim()) {
      Alert.alert("El nombre de usuario es requerido!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem("usuarios");
      const usuarios = data ? JSON.parse(data) : [];

      const usuarioEncontrado = usuarios.find(
        (u) => u.userName.toLowerCase() === userNameSearch.trim().toLowerCase()
      );

      if (usuarioEncontrado) {
        setUserName(usuarioEncontrado.userName);
        setOriginalUserName(usuarioEncontrado.userName);
        setName(usuarioEncontrado.name);
        setAge(usuarioEncontrado.age);
        setNeighborhood(usuarioEncontrado.neighborhood);
        setProfilePicture(usuarioEncontrado.profilePicture);
        setPassword(usuarioEncontrado.password);
        setEmail(usuarioEncontrado.email);
        setArrayUsuarios(usuarios);
      } else {
        Alert.alert("Usuario no encontrado!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar usuario.");
    }
  };

  const updateUser = async () => {
    if (
      !userName.trim() ||
      !name.trim() ||
      !age.trim() ||
      !neighborhood.trim() ||
      !profilePicture.trim() ||
      !password.trim() ||
      !email.trim()
    ) {
      Alert.alert("Todos los campos son requeridos!");
      return;
    }

    try {
      const usuarioActualizado = {
        userName,
        name,
        age,
        neighborhood,
        profilePicture,
        password,
        email,
      };

      const index = arrayUsuarios.findIndex(
        (u) => u.userName.toLowerCase() === originalUserName.toLowerCase()
      );

      if (index !== -1) {
        arrayUsuarios[index] = usuarioActualizado;
        await AsyncStorage.setItem("usuarios", JSON.stringify(arrayUsuarios));
        Alert.alert("Usuario actualizado con éxito!");
        clearForm();
      } else {
        Alert.alert("Error: usuario no encontrado en la lista.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar el usuario.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding">
              <MyText text="Buscar Usuario" style={styles.text} />
              <InputText
                placeholder="Ingrese el nombre de Usuario"
                style={styles.inputStyle}
                onChangeText={(text) => setUserNameSearch(text)}
                value={userNameSearch}
              />
              <SingleButton title="Buscar" customPress={searchUser} />

              <InputText
                placeholder="Nombre de Usuario"
                value={userName}
                onChangeText={setUserName}
              />
              <InputText
                placeholder="Nombre Completo"
                value={name}
                onChangeText={setName}
              />
              <InputText
                placeholder="Edad"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
              <InputText
                placeholder="Barrio"
                value={neighborhood}
                onChangeText={setNeighborhood}
              />
              <InputText
                placeholder="URL de la foto de perfil"
                value={profilePicture}
                onChangeText={setProfilePicture}
              />
              <InputText
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <InputText
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <SingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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
    marginHorizontal: 10,
  },
});
