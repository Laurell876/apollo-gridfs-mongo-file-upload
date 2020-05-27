const mongoose = require("mongoose");

const MONGO_CONNECTION =
  "mongodb+srv://devtest876:Yc5G0FeTLCIkzTql@talawa-dev-nk4oo.mongodb.net/test?retryWrites=true&w=majority";

const connect = async () => {
    let database;
    const client =  await mongoose.connect(
      MONGO_CONNECTION,
      { useUnifiedTopology: true, useNewUrlParser: true },
      function (err, client) {
        const db = client.db;
        database = db
        //console.log(db);
        return db;
      }
    );
    //console.log(database)
      return database
}


module.exports = connect;
