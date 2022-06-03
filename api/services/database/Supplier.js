const { insert, update, select, remove } = require("./DB");

const insertRecord = async (req) => {
  sql = "INSERT INTO ?? (?? , ?? , ?? , ?? , ??) VALUES (?, ? , ? , ? , ?)";
  params = [
    "supplier",
    "name",
    "email",
    "contact",
    "address",
    "joined_date",
    req.body.name,
    req.body.email,
    req.body.contact,
    req.body.address,
    req.body.joined_date,
  ];

  const res = await insert(sql, params);
  return res;
};

const updateRecord = async (req) => {
  sql = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
  params = [
    "supplier",
    "name",
    req.body.name,
    "email",
    req.body.email,
    "contact",
    req.body.contact,
    "address",
    req.body.address,
    "joined_date",
    req.body.joineddate,
    "id",
    req.body.id
  ];

  const res = await update(sql, params);
  return res;
};

const deleteRecord = async (id) => {
  sql = "DELETE FROM ?? WHERE ?? = ?"
  params = [
    "supplier",
    "id",
    id
  ];

  const res = await remove(sql, params);
  return res;
};

const findByName = async (name) => {
    sql = "SELECT * FROM ??  WHERE ??.?? LIKE ?";
    params = ["supplier", "supplier" , "name", name];
    let res = await select(sql, params);
    return res;
};

const findById = async (id) => {
  sql = "SELECT * FROM ??  WHERE ??.?? = ?";
  params = ["supplier", "supplier" , "id", id];
  let res = await select(sql, params);
  return res;
};

const findAll = async () => {
  sql = "SELECT * FROM ??";
  params = ["supplier"];
  let res = await select(sql, params);
  return res;
};

// const insertRecord = async (req) => {

//     sql1 = "INSERT INTO ?? (??, ??, ??, ?? , ?? , ??) VALUES (? , ?, ? , ? , ? , ?)";
//     params1 = [
//         "address",
//         "id",
//         "lane1",
//         "lane2",
//         "city",
//         "district",
//         "postal_code",
//         req.body.addressId,
//         req.body.lane1,
//         req.body.lane2,
//         req.body.city,
//         req.body.district,
//         req.body.postal_code
//       ];

//     sql2 = "INSERT INTO ?? (??, ??, ??, ?? ) VALUES (? , ?, ? , ? )";
//     params2 = [
//       "supplier",
//       "name",
//       "email",
//       "Joined_date",
//       "address_id",
//       req.body.name,
//       req.body.email,
//       req.body.joineddate,
//       req.body.addressId
//     ];

//     let res = await insertWithTransaction(sql1 , sql2, params1 , params2);
//     return res;
// };

// const updateRecord = async (req) => {

//     sql1 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
//     params1 = [
//         "address",
//         "lane1",
//         req.body.lane1,
//         "lane2",
//         req.body.lane2,
//         "city",
//         req.body.city,
//         "district",
//         req.body.district,
//         "postal_code",
//         req.body.postal_code,
//         "id",
//         req.body.addressId
//       ];

//     sql2 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
//     params2 = [
//       "supplier",
//       "name",
//       req.body.name,
//       "email",
//       req.body.email,
//       "Joined_date",
//       req.body.joineddate,
//       "id",
//       req.body.id
//     ];

//     let res = await updateWithTransaction(sql1 , sql2, params1 , params2);
//     return res;
// };

// const findByName = async (name) => {
//     sql = "SELECT ??.* , ??.?? , ??.?? , ??.?? , ??.?? , ??.?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??  WHERE ??.?? LIKE ?";
//     params = ["supplier", "address" , "lane1" , "address" , "lane2" ,"address" , "city" ,"address" , "district" , "address" , "postal_code" , "supplier", "address" , "supplier" , "address_id" , "address", "id" , "supplier" , "name", name];
//     let res = await select(sql, params);
//     return res;
// };

// const findById = async (id) => {
//     sql = "SELECT ??.* , ??.?? , ??.?? , ??.?? , ??.?? , ??.?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??  WHERE ??.?? = ?";
//     params = ["supplier", "address" , "lane1" , "address" , "lane2" ,"address" , "city" ,"address" , "district" , "address" , "postal_code" , "supplier", "address" , "supplier" , "address_id" , "address", "id" , "supplier" , "id", id];
//     let res = await select(sql, params);
//     return res;
// };

// const findAll = async () => {
//     sql = "SELECT ??.* , ??.?? , ??.?? , ??.?? , ??.?? , ??.?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??";
//     params = ["supplier", "address" , "lane1" , "address" , "lane2" ,"address" , "city" ,"address" , "district" , "address" , "postal_code" , "supplier", "address" , "supplier" , "address_id" , "address", "id"];
//     let res = await select(sql, params);
//     return res;
// };

// const deleteRecord = async (id1 , id2) => {

//     sql1 = "DELETE FROM ?? WHERE ?? = ?";
//     params1 = ["address", "id", id1];

//     sql2 = "DELETE FROM ?? WHERE ?? = ?";
//     params2 = ["supplier", "id", id2];

//     const res = await removeWithTransaction(sql1 , sql2, params1 , params2);
//     return res;
// };

module.exports = {
  insertRecord,
  findByName,
  findById,
  findAll,
  deleteRecord,
  updateRecord,
};
