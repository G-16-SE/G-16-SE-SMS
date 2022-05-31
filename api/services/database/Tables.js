const Runner = require("run-my-sql-file");
 
//SETTING THE OPTIONS
Runner.connectionOptions({
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password:process.env.DB_PWD,
   database: process.env.DB_NAME
});
 
const file_path = __dirname + "/scripts/sms.sql";
 
exports.exec = () => {
   Runner.runFile(file_path, (err)=>{
      if(err){
         console.log("Table creation failed");
         console.error(err.message);
         return false;
         
      } else {
         console.log("Table created successfully");
         return true;
      }
   });
}

