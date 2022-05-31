const { insertWithTransaction, updateWithTransaction, select , removeWithTransaction } = require("./DB");

const insertRecord = async (req) => {

    sql1 = "INSERT INTO ?? (??, ??, ??, ?? , ?? , ??) VALUES (? , ?, ? , ? , ? , ?)";
    params1 = [
        "address",
        "id",
        "lane1",
        "lane2",
        "city",
        "district",
        "postal_code",
        req.body.addressId,
        req.body.lane1,
        req.body.lane2,
        req.body.city,
        req.body.district,
        req.body.postal_code
      ];

    sql2 = "INSERT INTO ?? (??, ??, ??, ?? , ??) VALUES (? , ?, ? , ? , ?)";
    params2 = [
      "supplier",
      "name",
      "email",
      "Joined_date",
      "photo",
      "address_id",
      req.body.name,
      req.body.email,
      req.body.joineddate,
      req.body.photo,
      req.body.addressId
    ];
  
    let res = await insertWithTransaction(sql1 , sql2, params1 , params2);
    return res;
};

const updateRecord = async (req) => {

    sql1 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
    params1 = [
        "address",
        "lane1",
        req.body.lane1,
        "lane2",
        req.body.lane2,
        "city",
        req.body.city,
        "district",
        req.body.district,
        "postal_code",
        req.body.postal_code,
        req.body.addressId
      ];

    sql2 = "UPDATE ?? SET ?? = ? , ?? = ? , ?? = ? , ?? = ? WHERE ?? = ?";
    params2 = [
      "supplier",
      "name",
      req.body.name,
      "email",
      req.body.email,
      "Joined_date",
      req.body.joineddate,
      "photo",
      req.body.photo,
      "id",
      req.body.id
    ];
  
    let res = await updateWithTransaction(sql1 , sql2, params1 , params2);
    return res;
};

const findByName = async (name) => {
    sql = "SELECT * FROM ?? INNER JOIN ?? ON ??.?? = ??.??  WHERE ??.?? LIKE ?";
    params = ["supplier", "address" , "supplier", "address_id" , "address", "id" , "supplier" , "name", name];
    let res = await select(sql, params);
    return res;
};

const findById = async (id) => {
    sql = "SELECT * FROM ?? INNER JOIN ?? ON ??.?? = ??.??  WHERE ??.?? = ?";
    params = ["supplier", "address" , "supplier", "address_id" , "address", "id" , "supplier" , "id", id];
    let res = await select(sql, params);
    return res;
};

const findAll = async () => {
    sql = "SELECT * FROM ?? INNER JOIN ?? ON ??.?? = ??.??";
    params = ["supplier", "address" , "supplier", "address_id" , "address", "id"];
    let res = await select(sql, params);
    return res;
};

const deleteRecord = async (id1 , id2) => {

    sql1 = "DELETE FROM ?? WHERE ?? = ?";
    params1 = ["address", "id", id1];

    sql2 = "DELETE FROM ?? WHERE ?? = ?";
    params2 = ["supplier", "id", id2];

    const res = await removeWithTransaction(sql1 , sql2, params1 , params2);
    return res;
};

module.exports = {
    insertRecord,
    findByName,
    findById,
    findAll,
    deleteRecord,
    updateRecord
};