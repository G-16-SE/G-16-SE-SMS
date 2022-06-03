const { insert, update, select } = require("./DB");

const findByType = async (type) => {
    sql = "SELECT * FROM ?? WHERE ?? = ?";
    params = ["storage", "type", type];
    const res = await select(sql, params);
    return res;
};

const findAll = async () => {
    sql = "SELECT * FROM ?? WHERE ?? > ?";
    params = ["storage" , "stock_amount" , 0];
    const res = await select(sql, params);
    return res;
};

const findAllGoods = async () => {
    sql = "SELECT ?? , ?? ,?? FROM ??";
    params = ["id" , "type" , "unit" ,"storage"];
    const res = await select(sql, params);
    return res;
};

const findAllTypes = async () => {
    sql = "SELECT ?? FROM ??";
    params = ["type" , "storage"];
    const res = await select(sql, params);
    return res;
};

const insertRecord = async (req) => {
    sql = "INSERT INTO ?? (??, ?? , ?? , ??) VALUES (? , ? , ? , ?)";
    params = [
      "storage",
      "type",
      "unit",
      "unit_price",
      "stock_amount",
      req.body.type,
      req.body.unit,
      req.body.unit_price,
      0
    ];
  
    const res = await insert(sql, params);
    return res;
};

const updateRecord = async (req) => {
    sql = "UPDATE ?? SET ??=? , ?? = ?WHERE ??=?";
    params = [
      "storage",
      "unit_price",
      req.body.unit_price,
      "stock_amount",
      req.body.stock_amount,
      "id",
      req.body.id
    ];
  
    const res = await update(sql, params);
    return res;
};

module.exports = {
    findByType,
    findAll,
    findAllTypes,
    insertRecord,
    updateRecord

};