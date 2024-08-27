import { Sequelize } from 'sequelize';
import  config from '../config/database'

const db = new Sequelize(config);

export default db;