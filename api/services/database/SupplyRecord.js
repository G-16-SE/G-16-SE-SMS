const { insertWithTransaction, updateWithTransaction, select , removeWithTransaction } = require("./DB");

const insertRecordWithExistType = async (req) => {

    sql1 = "INSERT INTO ?? (?? , ?? , ?? , ?? , ??) VALUES (? , ? , ? , ? , ?)";
    params1 = [
        "supply_record",
        "supplier_id",
        "unit_prize",
        "amount",
        "type",
        "received_date",
        req.body.sup_ID,
        req.body.unit_prize,
        req.body.amount,
        req.body.type,
        req.body.received_date
      ];

    sql2 = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
    params2 = [
      "storage",
      "stock_amount",
      req.body.stock_amount,
      "last_refilled_date",
      getCurrentDate(),
      "type",
      req.body.type
    ];
  
    let res = await insertWithTransaction(sql1 , sql2, params1 , params2);
    return res;
};

const insertRecordWithNewType = async (req) => {

  sql1 = "INSERT INTO ?? (?? , ?? , ?? , ?? , ??) VALUES (? , ? , ? , ? , ?)";
  params1 = [
      "supply_record",
      "supplier_id",
      "unit_prize",
      "amount",
      "type",
      "received_date",
      req.body.sup_ID,
      req.body.unit_prize,
      req.body.amount,
      req.body.type,
      req.body.received_date
    ];

  sql2 = "INSERT INTO ?? (?? , ?? , ??) VALUES (? , ? , ?)";
  params2 = [
    "storage",
    "type",
    "stock_amount",
    "last_refilled_date",
    req.body.type,
    req.body.stock_amount,
    getCurrentDate()
  ];

  let res = await insertWithTransaction(sql1 , sql2, params1 , params2);
  return res;
};

const updateRecordWithExistType = async (req) => {

  sql1 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
  params1 = [
      "supply_record",
      "unit_prize",
      req.body.unit_prize,
      "amount",
      req.body.amount,
      "availability",
      req.body.availability,
      "received_date",
      req.body.received_date,
      "id",
      req.body.id
    ];

  sql2 = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
  params2 = [
    "storage",
    "stock_amount",
    req.body.stock_amount,
    "last_refilled_date",
    getCurrentDate(),
    "type",
    req.body.type
  ];

  let res = await updateWithTransaction(sql1 , sql2, params1 , params2);
  return res;
};


const updateRecordWithNewType = async (req) => {

  sql1 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
  params1 = [
      "supply_record",
      "supplier_id",
      req.body.sup_ID,
      "unit_prize",
      req.body.unit_prize,
      "amount",
      req.body.amount,
      "type",
      req.body.type,
      "received_date",
      req.body.received_date,
      "id",
      req.body.id
    ];

  sql2 = "INSERT INTO ?? (?? , ?? , ??) VALUES (? , ? , ?)";
  params2 = [
    "storage",
     "type",
    "stock_amount",
    "last_refilled_date",
    req.body.type,
    req.body.stock_amount,
    getCurrentDate()
  ];

  let res = await updateWithTransaction(sql1 , sql2, params1 , params2);
  return res;
};

const deleteRecord = async (req) => {

    sql1 = "DELETE FROM ?? WHERE ?? = ?";
    params1 = ["supply_record", "id", req.body.id];

    sql2 = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
    params2 = [
      "storage",
      "stock_amount",
      req.body.stock_amount,
      "last_refilled_date",
      getCurrentDate(),
      "type",
      req.body.type,
    ];

    const res = await removeWithTransaction(sql1 , sql2, params1 , params2);
    return res;
};

const findBySupplierId = async (supID) => {
  sql = "SELECT * FROM ?? WHERE ?? = ?";
  params = ["supply_record", "supplier_id", supID];
  const res = await select(sql, params);
  return res;
};

const findById = async (id) => {
  sql = "SELECT * FROM ?? WHERE ?? = ?";
  params = ["supply_record", "id", id];
  const res = await select(sql, params);
  return res;
};

const findAll = async () => {
  sql = "SELECT * FROM ??";
  params = ["supply_record"];
  const res = await select(sql, params);
  return res;
};

const getCurrentDate = () => {
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
    
  var date = year + "-" + month + "-" + day;

  return date;
}

module.exports = {
  insertRecordWithExistType,
  insertRecordWithNewType,
  updateRecordWithExistType,
  updateRecordWithNewType,
  deleteRecord,
  findBySupplierId,
  findAll,
  findById
};