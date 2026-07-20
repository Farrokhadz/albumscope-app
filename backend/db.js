const Database = require("better-sqlite3");
const db = new Database("playhead.db");
db.exec(`
 CREATE TABLE IF NOT EXISTS users ( id INTEGER  PRIMARY KEY AUTOINCREMENT , email TEXT, password TEXT)
`);
const stmt = db.prepare("INSERT INTO users (email,password) VALUES (?, ?)");
stmt.run("Farrokhandarz84@gmail.com", "123456789");
