import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'gatuto', 'gatuto', {
  host: 'localhost', // Dirección HTTP
  dialect: 'mysql',
  // logging: false,
});


export default db;