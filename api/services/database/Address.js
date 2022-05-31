const { insert, update, select } = require("./DB");

const insertRecord = async (req) => {
    sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (? , ?, ? , ?)";
    params = [
      "Address",
      "Line1",
      "Line2",
      "City",
      "District",
      "Postal_Code",
      "supplierID",
      req.body.line1,
      req.body.line2,
      req.body.city,
      req.body.district,
      req.body.Postal_Code,
      req.body.supplierID,
    ];
  
    const res = await insert(sql, params);
    return res;
};

const deleteRecord = async (id) => {
    sql = "DELETE FROM ?? WHERE ?? = ?";
    params = ["supplier", "id", id];
    const res = await remove(sql, params);
    return res;
};

module.exports = {
    deleteRecord
};