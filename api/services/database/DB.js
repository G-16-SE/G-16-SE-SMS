var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});


const connect = () => new Promise((resolve, reject) => {
  res = {
    status: true,
  };

  try {
    connection.connect(function (err) {
      if (err) {
        console.log("Database Connection Failed");
        console.error("error connecting: " + err.stack);
        res.status = false;
        resolve(res);
      }else {
        console.log("Database Connected");
        resolve(res);
      }
  
      
    });
    
  } catch (err) {
    console.log("Database Connection Failed with exception");
    res.status = false;
    console.error(err.message);
    resolve(res);
  }
});

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
        // console.log(results.insertId);
        // res.values = results.insertId;
        resolve(res);
      });
    } catch (err) {
      res.status = false;
      console.error(err.message);
      reject(err);
    }
  });

const insertWithTransaction = (sql1, sql2, params1, params2) =>
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
          console.error(err.message);
          res.status = false;
          resolve(res);
          return;
        }
        connection.query(sql1, function (error1, results1, fields1) {
          if (error1) {
            connection.rollback();
            console.error(error1.message);
            res.status = false;
            resolve(res);
            return;
          }

          var user_id = results1.insertId;

          connection.query(sql2, function (error2, results2, fields2) {
            if (error2) {
              connection.rollback();
              console.error(error2.message);
              res.status = false;
              resolve(res);
              return;
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback();
                console.error(error.message);
                res.status = false;
                resolve(res);
                return;
              }
              console.log("insertion success!");
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
      // console.log(sql)
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

const updateWithTransaction = (sql1, sql2, params1, params2) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql1 = mysql.format(sql1, params1);
      sql2 = mysql.format(sql2, params2);

      // console.log(sql1)
      // console.log(sql2)

      connection.beginTransaction(function (err) {
        if (err) {
          console.error(error.message);
          res.status = false;
          resolve(res);
          return;
        }
        connection.query(sql1, function (error1, results1, fields) {
          if (error1) {
            connection.rollback();
            console.error(error1.message);
            res.status = false;
            resolve(res);
            return;
          }

          connection.query(sql2, function (error2, results2, fields) {
            if (error2) {
              connection.rollback();
              console.error(error2.message);
              res.status = false;
              resolve(res);
              return;
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback();
                console.error(error.message);
                res.status = false;
                resolve(res);
                return;
              }
              console.log("updation success!");
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

const select = (sql, params) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql = mysql.format(sql, params);
      // console.log(sql)

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

const removeWithTransaction = (sql1, sql2, params1, params2) =>
  new Promise((resolve, reject) => {
    res = {
      values: [],
      status: true,
    };

    try {
      sql1 = mysql.format(sql1, params1);
      sql2 = mysql.format(sql2, params2);

      // console.log(sql1 , sql2);

      connection.beginTransaction(function (err) {
        if (err) {
          console.error(err.message);
          res.status = false;
          resolve(res);
          return;
        }
        connection.query(sql1, function (error1, results1, fields1) {
          if (error1) {
            connection.rollback();
            console.error(error1.message);
            res.status = false;
            resolve(res);
            return;
          }

          connection.query(sql2, function (error2, results2, fields2) {
            if (error2) {
              connection.rollback();
              console.error(error2.message);
              res.status = false;
              resolve(res);
              return;
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback();
                console.error(err.message);
                res.status = false;
                resolve(res);
                return;
              }
              console.log("deletion success!");
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



module.exports = {
  connect,
  insert,
  insertWithTransaction,
  update,
  updateWithTransaction,
  select,
  remove,
  removeWithTransaction
};
