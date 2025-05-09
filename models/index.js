"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let db = {};
const sequelize = new Sequelize(
  'mydb',         // Database name
  'myuser',       // Database username
  'mypassword',   // Database password
  {
    host: 'mysql', // Replace 'mysql' with the actual host (like '127.0.0.1' or a container name)
    dialect: 'mysql', // Database dialect (MySQL)
    port: 3306,    // MySQL port
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
