import sequelize from "sequelize";

const db = new sequelize('learn-node','root','', {
    host:'localhost',
    dialect: 'mysql'
});

export default db;