// database/materialService.js
import db from "./db";

export const initMaterialTable = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS MATERIALES (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      categoria TEXT,
      imagen TEXT
    );
  `);
};

export const getAllMateriales = () => {
  return db.getAllSync("SELECT * FROM MATERIALES ORDER BY id DESC;");
};

export const addMaterial = (material) => {
  db.runSync(
    "INSERT INTO MATERIALES (nombre, categoria, imagen) VALUES (?, ?, ?);",
    [material.nombre, material.categoria, material.imagen]
  );
};

export const updateMaterial = (material) => {
  db.runSync(
    `UPDATE MATERIALES SET 
      nombre = ?, 
      categoria = ?, 
      imagen = ? 
    WHERE id = ?;`,
    [material.nombre, material.categoria, material.imagen, material.id]
  );
};

export const getMaterialByNombre = (nombre) => {
  const rows = db.getAllSync(
    "SELECT * FROM MATERIALES WHERE LOWER(nombre) = LOWER(?) LIMIT 1;",
    [nombre]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const deleteMaterialByNombre = (nombre) => {
  db.runSync("DELETE FROM MATERIALES WHERE LOWER(nombre) = LOWER(?);", [
    nombre,
  ]);
};
