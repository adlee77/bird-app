import mysql from "mysql2"
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 

console.log();
export const db = mysql.createConnection({
  host:process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB   
})