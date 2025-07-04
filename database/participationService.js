// 1) Asegurate de haber inicializado la tabla en initDB (sólo la primera vez):
export const initParticipationTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS participaciones (
         id TEXT PRIMARY KEY,
         usuario TEXT,
         retoId TEXT,
         fecha INTEGER
       );`
    );
  });
};

// 2) Obtener todas las participaciones
export const getAllParticipation = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM participaciones ORDER BY fecha DESC;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// 3) (Opcional) Obtener solo las participaciones de un usuario
export const getParticipationsByUser = (userName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM participaciones WHERE usuario = ? ORDER BY fecha DESC;`,
        [userName],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// 4) Insertar una nueva participación
export const addParticipation = (participacion) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO participaciones (id, usuario, retoId, fecha) VALUES (?, ?, ?, ?);`,
        [
          participacion.id,
          participacion.usuario,
          participacion.retoId,
          participacion.fecha,
        ],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
