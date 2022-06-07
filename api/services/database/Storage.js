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
    sql = "SELECT ?? , ??, ?? ,?? FROM ??";
    params = ["id" , "type" , "unit", "image" ,"storage"];
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
    sql = "INSERT INTO ?? (??, ?? , ?? , ?? , ??) VALUES (? , ? , ? , ? , ?)";
    params = [
      "storage",
      "type",
      "unit",
      "unit_price",
      "stock_amount",
      "image",
      req.body.type,
      req.body.unit,
      req.body.unit_price,
      0,
      "goods.png"
    ];
  
    const res = await insert(sql, params);
    return res;
};

const updateRecord = async (req) => {
    sql = "UPDATE ?? SET ??=? , ?? = ?, ?? = ? WHERE ??=?";
    params = [
      "storage",
      "unit_price",
      req.body.unit_price,
      "stock_amount",
      req.body.stock_amount,
      "last_refilled_date",
      getCurrentDate(),
      "id",
      req.body.id
    ];
  
    const res = await update(sql, params);
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
    findByType,
    findAll,
    findAllTypes,
    insertRecord,
    updateRecord,
    findAllGoods

};