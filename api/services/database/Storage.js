const { insert, update, select } = require("./DB");

const findByType = async (type) => {
    sql = "SELECT * FROM ?? WHERE ?? = ?";
    params = ["storage", "type", type];
    const res = await select(sql, params);
    return res;
};

module.exports = {
    findByType
};