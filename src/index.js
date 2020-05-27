

const typeDefs = require("./typeDefs")
const {ApolloServer} = require("apollo-server")
const resolvers = require("./resolvers")


// Import your database configuration
const connect = require("./db.js")


const start = async ()=> {
  try {
     await connect();
      console.log("Connected 🚀 To MongoDB Successfully");
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    server.listen(4000, () => {
      console.log(`🚀 server running @ http://localhost:4000`);
    });
  } catch (err) {
    console.error(err);
  }
}
start()

module.exports = start
