import db from "./db";

export const initRetoTable = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS RETOS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descripcion TEXT,
      fechaInicio TEXT,
      fechaFin TEXT,
      imagen TEXT
    );
  `);
};

// Obtener todos los retos
export const getAllRetos = () => {
  return db.getAllSync("SELECT * FROM RETOS ORDER BY id DESC;");
};

// Obtener reto por ID
export const getRetoById = (id) => {
  const rows = db.getAllSync("SELECT * FROM RETOS WHERE id = ?;", [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Agregar un nuevo reto
export const addReto = (reto) => {
  db.runSync(
    "INSERT INTO RETOS (titulo, descripcion, fechaInicio, fechaFin, imagen) VALUES (?, ?, ?, ?, ?);",
    [
      reto.titulo,
      reto.descripcion,
      reto.fechaInicio,
      reto.fechaFin,
      reto.imagen,
    ]
  );
};

export const getRetoByTitulo = (titulo) => {
  const rows = db.getAllSync(
    "SELECT * FROM RETOS WHERE LOWER(titulo) = LOWER(?) LIMIT 1;",
    [titulo]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const deleteRetoByTitulo = (titulo) => {
  db.runSync("DELETE FROM RETOS WHERE LOWER(titulo) = LOWER(?);", [titulo]);
};
