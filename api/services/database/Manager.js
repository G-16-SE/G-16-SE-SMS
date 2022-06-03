const { insert, insertWithTransaction, select , updateWithTransaction } = require("./DB");

const insertRecord = async (req) => {
  sql1 = "INSERT INTO ?? (??, ??, ??, ??) VALUES (? , ?, ? , ?)";
  params1 = [
    "user",
    "id",
    "email",
    "password",
    "role",
    req.body.user_id,
    req.body.email,
    req.body.hashPassword,
    req.body.role,
  ];

  sql2 = "INSERT INTO ?? (??, ??, ??, ??) VALUES (? , ?, ? , ?)";
  params2 = [
    "manager",
    "user_id",
    "name",
    "contact",
    "join_date",
    req.body.user_id,
    req.body.name,
    req.body.contactno,
    req.body.joineddate,
  ];

  let res = await insertWithTransaction(sql1, sql2, params1, params2);
  return res;
};

const updateRecord = async (req) => {
  sql1 = "";
  sql2 = "";
  params1 = [];
  params2 = [];

  if (req.body.password == "") {
    sql1 = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    params1 = ["user", "email", req.body.email, "id", req.body.user_id];

    sql2 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
    params2 = [
      "manager",
      "name",
      req.body.name,
      "contact",
      req.body.contactno,
      "join_date",
      req.body.joineddate,
      "user_id",
      req.body.user_id
    ];
  } else {
    sql1 = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
    params1 = [
      "user",
      "email",
      req.body.email,
      "password",
      req.body.hashPassword,
      "id",
      req.body.user_id,
    ];

    sql2 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
    params2 = [
      "manager",
      "name",
      req.body.name,
      "contact",
      req.body.contactno,
      "join_date",
      req.body.joineddate,
      "user_id",
      req.body.user_id
    ];
  }

  let res = await updateWithTransaction(sql1, sql2, params1, params2);
  return res;
};

const findById = async (id) => {
  sql = "SELECT * FROM ?? WHERE ?? = ?";
  params = ["manager", "id", id];
  const res = await select(sql, params);
  return res;
};

const findAll = async () => {
  sql = "SELECT ??.* , ??.?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??";
  params = ["manager" , "user" , "email" ,"manager" , "user" , "user" , "id" , "manager", "user_id"];
  const res = await select(sql, params);
  return res;
};

const findByUserId = async (user_id) => {
  sql = "SELECT ??.* , ??.?? FROM ?? INNER JOIN ?? ON ??.?? = ??.?? WHERE ??.?? = ?";
  params = ["manager" , "user" , "email" ,"manager" , "user" , "user" , "id" , "manager", "user_id" , "manager" , "user_id" , user_id];
  const res = await select(sql, params);
  return res;
};


module.exports = {
  insertRecord,
  updateRecord,
  findById,
  findAll,
  findByUserId
};
