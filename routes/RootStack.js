import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Pantallas
import AuthLoading from "../screens/AuthLoading"; // Ruta a crear
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login"; // Ruta a crear

// Usuarios
import DeleteUser from "../screens/User/DeleteUser";
import RegisterUser from "../screens/User/RegisterUser";
import UpdateUser from "../screens/User/UpdateUser";
import UserMenu from "../screens/User/UserMenu";
import ViewAllUser from "../screens/User/ViewAllUser";
import ViewUser from "../screens/User/ViewUser";

// Retos
import DeleteReto from "../screens/Retos/DeleteReto";
import RegisterReto from "../screens/Retos/RegisterReto";
import RetosMenu from "../screens/Retos/RetosMenu";
import UpdateReto from "../screens/Retos/UpdateReto";
import ViewAllRetos from "../screens/Retos/ViewAllRetos";
import ViewReto from "../screens/Retos/ViewReto";

// Materiales Reciclables
import DeleteMaterialReciclable from "../screens/Materiales/DeleteMaterialReciclable";
import MaterialesReciclablesMenu from "../screens/Materiales/MaterialesReciclablesMenu";
import RegisterMaterialReciclable from "../screens/Materiales/RegisterMaterialReciclable";
import UpdateMaterialReciclable from "../screens/Materiales/UpdateMaterialReciclable";
import ViewAllMaterialReciclable from "../screens/Materiales/ViewAllMaterialReciclable";
import ViewMaterialReciclable from "../screens/Materiales/ViewMaterialReciclable";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        {/* Pantalla de carga para chequear si está logueado */}
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* Pantalla principal */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />

        {/* Usuarios */}
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

        {/* Retos */}
        <Stack.Screen
          name="RetosMenu"
          component={RetosMenu}
          options={{ title: "Gestión de Retos" }}
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

        {/* Materiales Reciclables */}
        <Stack.Screen
          name="MaterialesReciclablesMenu"
          component={MaterialesReciclablesMenu}
          options={{ title: "Ver todos los Materiales Reciclables" }}
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
