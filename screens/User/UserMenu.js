import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Button from "../../components/Button.js";

const UserMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView>
          <Button
            title="Registrar Usuario"
            btnColor="green"
            btnIcon="user-plus"
            customPress={() => navigation.navigate("RegisterUser")}
          />
          <Button
            title="Actualizar Usuario"
            btnColor="orange"
            btnIcon="user-edit"
            customPress={() => navigation.navigate("UpdateUser")}
          />
          <Button
            title="Ver Usuario"
            btnColor="blue"
            btnIcon="user"
            customPress={() => navigation.navigate("ViewUser")}
          />
          <Button
            title="Borrar Usuario"
            btnColor="red"
            btnIcon="user-times"
            customPress={() => navigation.navigate("DeleteUser")}
          />
          <Button
            title="Ver todos los Usuarios"
            btnColor="purple"
            btnIcon="users"
            customPress={() => navigation.navigate("ViewAllUsers")}
          />
          <Button
            title="Panel de Usuario"
            btnColor="cyan"
            btnIcon="user-shield"
            customPress={() => navigation.navigate("UserPanel")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
});
