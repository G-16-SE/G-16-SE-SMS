const {insert , update , select} = require('./DB');


const findByEmail = async (email) => {
    sql = "SELECT * FROM ?? WHERE ?? = ?";
    params = ['user', 'email' , email];
    let res = await select(sql, params);
    return res;
}

const findById = async (id) => {
    sql = "SELECT * FROM ?? WHERE ?? = ?";
    params = ['user', 'id' , id];
    const res = await select(sql, params);
    return res;
}

const insertRecord = async (req) => {
    sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (? , ?, ? , ?)";
    params = ['user', 'id' , 'email' , 'password' , 'role', req.body.user_id, req.body.email , req.body.hashPassword , req.body.role];

    const res = await insert(sql, params);
    return res;
}

const updateToken = async (user_id , token) => {
    sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    params = ['user', 'token' , token  , 'id' , user_id];
    const res = await update(sql, params);
    return res;
}

const deleteRecord = async (user_id) => {
    sql = "DELETE FROM ?? WHERE ?? = ?";
    params = ['user', 'id' , user_id];
    const res = await remove(sql, params);
    return res;
}


module.exports = {
    findById , findByEmail , insertRecord , updateToken , deleteRecord
};