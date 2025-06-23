import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Button from "../components/Button.js";

const RetosMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView>
          <Button
            title="Registrar Reto"
            btnColor="green"
            btnIcon="user-plus"
            customPress={() => navigation.navigate("RegisterReto")}
          />
          <Button
            title="Actualizar Reto"
            btnColor="orange"
            btnIcon="user-edit"
            customPress={() => navigation.navigate("UpdateReto")}
          />
          <Button
            title="Ver Reto"
            btnColor="blue"
            btnIcon="user"
            customPress={() => navigation.navigate("ViewReto")}
          />
          <Button
            title="Borrar Reto"
            btnColor="red"
            btnIcon="user-times"
            customPress={() => navigation.navigate("DeleteReto")}
          />
          <Button
            title="Ver todos los Retos"
            btnColor="purple"
            btnIcon="users"
            customPress={() => navigation.navigate("ViewAllRetos")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RetosMenu;

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
