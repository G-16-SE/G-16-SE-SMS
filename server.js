const http = require("http");
const {app} = require("./app");
const { connect } = require("./api/services/database/DB");

const port = process.env.PORT || 8087;

const server = http.createServer(app);

//connect database services
const init_db = async() => {
    let db = await connect();

    if(!db.status) {
        console.log("server closed");
        server.close();
    }
};

init_db();




server.listen(port);

