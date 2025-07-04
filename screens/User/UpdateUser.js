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
import {
  getAllUsers,
  updateUser as updateUserInDB,
} from "../../database/userService";

const UpdateUser = () => {
  const [userNameSearch, setUserNameSearch] = useState("");
  const [originalUserId, setOriginalUserId] = useState(null); // guardamos id para update
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const clearForm = () => {
    setUserNameSearch("");
    setOriginalUserId(null);
    setUserName("");
    setName("");
    setAge("");
    setNeighborhood("");
    setProfilePicture("");
    setPassword("");
    setEmail("");
  };

  const searchUser = async () => {
    if (!userNameSearch.trim()) {
      Alert.alert("Error", "El nombre de usuario es requerido.");
      return;
    }

    try {
      const usuariosData = await getAllUsers();

      const userFound = usuariosData.find(
        (u) => u.userName.toLowerCase() === userNameSearch.trim().toLowerCase()
      );

      if (!userFound) {
        Alert.alert("Usuario no encontrado");
        clearForm();
        return;
      }

      setOriginalUserId(userFound.id); // guardamos id para actualizar
      setUserName(userFound.userName);
      setName(userFound.name);
      setAge(String(userFound.age));
      setNeighborhood(userFound.neighborhood);
      setProfilePicture(userFound.profilePicture);
      setPassword(userFound.password);
      setEmail(userFound.email);
    } catch (error) {
      console.error(error);
      Alert.alert("Error al buscar usuario");
    }
  };

  const updateUser = () => {
    if (
      !userName.trim() ||
      !name.trim() ||
      !age.trim() ||
      !neighborhood.trim() ||
      !profilePicture.trim() ||
      !password.trim() ||
      !email.trim()
    ) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      Alert.alert("Error", "La edad debe ser un número positivo.");
      return;
    }

    if (!originalUserId) {
      Alert.alert("Error", "Primero busque un usuario para actualizar.");
      return;
    }

    Alert.alert(
      "Confirmar actualización",
      `¿Desea actualizar el usuario "${userName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Actualizar",
          onPress: async () => {
            try {
              const updatedUser = {
                id: originalUserId,
                userName,
                name,
                age: ageNum,
                neighborhood,
                profilePicture,
                password,
                email,
              };

              await updateUserInDB(updatedUser);

              Alert.alert("Éxito", "Usuario actualizado correctamente.");
              clearForm();
            } catch (error) {
              console.error(error);
              Alert.alert("Error al actualizar el usuario.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView behavior="padding" style={{ padding: 20 }}>
              <MyText text="Buscar Usuario" style={styles.text} />
              <InputText
                placeholder="Ingrese el nombre de Usuario"
                style={styles.input}
                onChangeText={setUserNameSearch}
                value={userNameSearch}
              />
              <SingleButton title="Buscar" customPress={searchUser} />

              {/* Mostrar datos solo si se encontró un usuario */}
              {originalUserId ? (
                <>
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
                </>
              ) : null}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "white" },
  generalView: { flex: 1 },
  text: { padding: 10, marginLeft: 5, color: "black", fontWeight: "bold" },
  input: { marginVertical: 8, paddingHorizontal: 10 },
});
