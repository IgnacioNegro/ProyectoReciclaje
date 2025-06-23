import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Button from "../components/Button.js";

const MaterialesReciclablesMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView>
          <Button
            title="Registrar Material Reciclable"
            btnColor="green"
            btnIcon="user-plus"
            customPress={() =>
              navigation.navigate("RegisterMaterialReciclable")
            }
          />
          <Button
            title="Actualizar Material Reciclable"
            btnColor="orange"
            btnIcon="user-edit"
            customPress={() => navigation.navigate("UpdateMaterialReciclable")}
          />
          <Button
            title="Ver Material Reciclable"
            btnColor="blue"
            btnIcon="user"
            customPress={() => navigation.navigate("ViewMaterialReciclable")}
          />
          <Button
            title="Borrar Material Reciclable"
            btnColor="red"
            btnIcon="user-times"
            customPress={() => navigation.navigate("DeleteMaterialReciclable")}
          />
          <Button
            title="Ver todos los Materiales Reciclables"
            btnColor="purple"
            btnIcon="users"
            customPress={() => navigation.navigate("ViewAllMaterialReciclable")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MaterialesReciclablesMenu;

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
