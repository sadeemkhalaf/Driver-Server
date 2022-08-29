import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "driver",
});

export default connection.promise();
