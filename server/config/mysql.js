require("dotenv").config();
const mysql = require("mysql");

const db_config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    console.log("Connect to mysql");
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

const Query = (query, ...values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = Query;
