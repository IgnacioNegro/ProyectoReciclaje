import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("PlanetaVivo.db");

export const patchAddTipoUsuario = () => {
  try {
    db.execSync(
      "ALTER TABLE USUARIOS ADD COLUMN tipoUsuario TEXT DEFAULT 'normal';"
    );
    console.log("Columna tipoUsuario agregada.");
  } catch (error) {
    if (error.message.includes("duplicate column name")) {
      console.log("La columna tipoUsuario ya existe.");
    } else {
      console.error("Error al agregar columna tipoUsuario:", error);
      throw error;
    }
  }
};

export const createSuperAdminIfNotExists = () => {
  try {
    const result = db.execSync(
      "SELECT * FROM USUARIOS WHERE tipoUsuario = 'superadmin' LIMIT 1;"
    );

    if (
      !result ||
      result.length === 0 ||
      !result[0].values ||
      result[0].values.length === 0
    ) {
      db.execSync(`
        INSERT INTO USUARIOS 
          (userName, password, email, name, age, neighborhood, profilePicture, tipoUsuario) 
        VALUES 
          ('superadmin', 'admin123', 'admin@example.com', 'Administrador', 99, 'Centro', '', 'superadmin');
      `);
      console.log("Usuario superadmin creado.");
    } else {
      console.log("Ya existe un usuario superadmin.");
    }
  } catch (error) {
    console.error("Error creando superadmin:", error);
    throw error;
  }
};

export default db;
