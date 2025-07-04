import db from "./db";

export const initDB = () => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS USUARIOS (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    userName TEXT,
     password TEXT,
      email TEXT,
       name TEXT,
        age INTEGER,
         neighborhood TEXT,
          profilePicture TEXT,
          puntaje INTEGER DEFAULT 0,
          retosParticipados TEXT DEFAULT '[]');`
  );
};

export const getAllUsers = () => {
  return db.getAllSync(" Select * from USUARIOS  ORDER BY id DESC");
};

export const addUser = (user) => {
  db.runSync(
    "INSERT INTO USUARIOS (userName, password, email, name, age, neighborhood, profilePicture, puntaje, retosParticipados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      user.userName,
      user.password,
      user.email,
      user.name,
      user.age,
      user.neighborhood,
      user.profilePicture,
      user.puntaje,
      user.retosParticipados,
    ]
  );
};
export const deleteUser = (id) => {
  db.runSync("DELETE FROM USUARIOS WHERE id = ?;", [id]);
};

export const getUserByUserName = (userName) => {
  const rows = db.getAllSync(
    "SELECT * FROM USUARIOS WHERE LOWER(userName) = LOWER(?) LIMIT 1;",
    [userName]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const deleteUserByUserName = (userName) => {
  db.runSync("DELETE FROM USUARIOS WHERE LOWER(userName) = LOWER(?);", [
    userName,
  ]);
};

export const updateUser = (user) => {
  db.runSync(
    "UPDATE USUARIOS SET userName = ?, password = ?, email = ?, name = ?, age = ?, neighborhood = ?, profilePicture = ?, puntaje = ?, retosParticipados = ? WHERE id = ?;",
    [
      user.userName,
      user.password,
      user.email,
      user.name,
      user.age,
      user.neighborhood,
      user.profilePicture,
      user.puntaje,
      user.retosParticipados,
      user.id,
    ]
  );
};
