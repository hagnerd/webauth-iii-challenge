const db = require("../db");

async function createUser(input) {
  const [id] = await db.from("users").insert(input);
  const user = await db
    .select("*")
    .from("users")
    .where({ id });

  return user;
}

async function getUserByUsername(username) {
  const [user] = await db
    .select("*")
    .from("users")
    .where({ username });

  return user ? user : null;
}

async function getAll() {
  return db.select("*").from("users");
}

module.exports = {
  createUser,
  getUserByUsername,
  getAll
};
