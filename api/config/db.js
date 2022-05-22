const mongoose = require("mongoose");

const db_url = process.env.MONGOGB_URL

exports.connect = () => {
  // Connecting to the database
  mongoose.connect(db_url ,
    async (err) => {
        if(err) throw err;
        console.log("connected to database")
    });

    const connection = mongoose.connection;
    connection.once("open", async () => {
        await console.log("Momgodb Connection Success!");
    })
};