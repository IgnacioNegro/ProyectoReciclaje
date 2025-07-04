import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("PlanetaVivo.db");

export default db;
