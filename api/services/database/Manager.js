const { insert, insertUser, select } = require("./DB");

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

  const res = await insertUser(sql1, sql2, params1, params2);
  return res;
};

const updateRecord = async (req) => {
  sql1 = "";
  sql2 = "";
  params1 = [];
  params2 = [];

  if (req.body.password != "") {
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
    ];
  } else {
    sql1 = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
    params1 = [
      "user",
      "email",
      req.body.email,
      "password",
      req.body.password,
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
    ];
  }

  const res = await updateUser(sql1, sql2, params1, params2);
  return res;
};

module.exports = {
  insertRecord,
  updateRecord,
};
