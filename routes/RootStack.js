import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeleteMaterialReciclable from "../screens/DeleteMaterialReciclable.js";
import DeleteReto from "../screens/DeleteReto.js";
import DeleteUser from "../screens/DeleteUser.js";
import HomeScreen from "../screens/HomeScreen.js";
import MaterialesReciclablesMenu from "../screens/MaterialesReciclablesMenu.js";
import RegisterMaterialReciclable from "../screens/RegisterMaterialReciclable.js";
import RegisterReto from "../screens/RegisterReto.js";
import RegisterUser from "../screens/RegisterUser.js";
import RetosMenu from "../screens/RetosMenu.js";
import UpdateMaterialReciclable from "../screens/UpdateMaterialReciclable.js";
import UpdateReto from "../screens/UpdateReto.js";
import UpdateUser from "../screens/UpdateUser.js";
import UserMenu from "../screens/UserMenu.js";
import ViewAllMaterialReciclable from "../screens/ViewAllMaterialReciclable.js";
import ViewAllRetos from "../screens/ViewAllRetos.js";
import ViewAllUser from "../screens/ViewAllUser.js";
import ViewMaterialReciclable from "../screens/ViewMaterialReciclable.js";
import ViewReto from "../screens/ViewReto.js";
import ViewUser from "../screens/ViewUser.js";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ title: "Registrar Usuario" }}
        />

        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{ title: "Eliminar Usuario" }}
        />

        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUser}
          options={{ title: "Ver todos los usuarios" }}
        />

        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{ title: "Ver Usuario" }}
        />

        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{ title: "Actualizar Usuario" }}
        />

        <Stack.Screen
          name="UserMenu"
          component={UserMenu}
          options={{ title: "Gestión de Usuarios" }}
        />
        <Stack.Screen
          name="RetosMenu"
          component={RetosMenu}
          options={{ title: "Gestión de Retos" }}
        />

        <Stack.Screen
          name="MaterialesReciclablesMenu"
          component={MaterialesReciclablesMenu}
          options={{ title: "Ver todos los Materiales Reciclables" }}
        />
        <Stack.Screen
          name="RegisterReto"
          component={RegisterReto}
          options={{ title: "Agregar un reto" }}
        />

        <Stack.Screen
          name="UpdateReto"
          component={UpdateReto}
          options={{ title: "Actualizar Reto" }}
        />

        <Stack.Screen
          name="ViewReto"
          component={ViewReto}
          options={{ title: "Ver Reto" }}
        />

        <Stack.Screen
          name="DeleteReto"
          component={DeleteReto}
          options={{ title: "Borrar Reto" }}
        />

        <Stack.Screen
          name="ViewAllRetos"
          component={ViewAllRetos}
          options={{ title: "Ver todos los Retos" }}
        />

        <Stack.Screen
          name="RegisterMaterialReciclable"
          component={RegisterMaterialReciclable}
          options={{ title: "Registrar Material Reciclable" }}
        />

        <Stack.Screen
          name="UpdateMaterialReciclable"
          component={UpdateMaterialReciclable}
          options={{ title: "Actualizar Material Reciclable" }}
        />

        <Stack.Screen
          name="ViewMaterialReciclable"
          component={ViewMaterialReciclable}
          options={{ title: "Ver Material Reciclable" }}
        />

        <Stack.Screen
          name="DeleteMaterialReciclable"
          component={DeleteMaterialReciclable}
          options={{ title: "Eliminar Material Reciclable" }}
        />

        <Stack.Screen
          name="ViewAllMaterialReciclable"
          component={ViewAllMaterialReciclable}
          options={{ title: "Ver todos los Materiales Reciclables" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
