var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sms",
  port: "3306",
});

const connect = async () => {
  await connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("Database Connected");
  });
};

const insert = (sql, params) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql = mysql.format(sql, params);
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.error(error.message);
          res.status = false;
          resolve(res);
        }
        console.log(results.insertId);
        resolve(res);
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(err);
    }
  });

const insertUser = (sql1, sql2, params1, params2) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql1 = mysql.format(sql1, params1);
      sql2 = mysql.format(sql2, params2);

      connection.beginTransaction(function (err) {
        if (err) {
          console.error(error.message);
          res.status = false;
          resolve(res);
        }
        connection.query(sql1, function (error, results, fields) {
          if (error) {
            connection.rollback();
            console.error(error.message);
            res.status = false;
            resolve(res);
          }

          var user_id = results.insertId;

          connection.query(sql2, function (error, results, fields) {
            if (error) {
              connection.rollback();
              console.error(error.message);
              res.status = false;
              resolve(res);
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback();
                console.error(error.message);
                res.status = false;
                resolve(res);
              }
              console.log("user insertion success!");
              resolve(res);
            });
          });
        });
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(res);
    }
  });

const update = (sql, params) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql = mysql.format(sql, params);
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.error(error.message);
          res.status = false;
          resolve(res);
        }
        resolve(res);
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(err);
    }
  });

const select = (sql, params) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql = mysql.format(sql, params);

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.error(error.message);
          res.status = false;
          resolve(res);
        }
        res.values = results;

        resolve(res);
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(res);
    }
  });

const remove = (sql, params) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql = mysql.format(sql, params);

      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.error(error.message);
          res.status = false;
          resolve(res);
        }
        resolve(res);
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(res);
    }
  });

module.exports = {
  connect,
  insert,
  insertUser,
  update,
  select,
  remove,
};
