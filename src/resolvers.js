// src/resolvers.js

const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");
const connection = require("./db.js")
var mongoose = require('mongoose');
//import file model
const File = require("./fileModel");



// //MONGOOSE AND GRIDFS
// const { createModel } = require('mongoose-gridfs');

// // or create custom bucket with custom options
// const Attachment = createModel({
//     modelName: 'Attachment',
//     connection: connection
// });


//MONGOOSE AND GRIDFS
//Passing files onto gridfs
// const test = async()=> {
//     const data = await connection()
//     //console.log(data)
//     const gridFsBucket = new mongoose.mongo.GridFSBucket(data);
//     const uploadStream = gridFsBucket.openUploadStream(fileName);
//     await new Promise((resolve, reject) => {
//         stream
//           .pipe(uploadStream)
//           .on("error", reject)
//           .on("finish", resolve);
//       });
//       return { _id: uploadStream.id, filename, mimetype, encoding }
// }
// test()



//stores uploaded image to image folder
const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();

  //location where image is sored
  const path = `images/${id}-${filename}`;

  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};


//processes upload sent to the resolver, to be used in the storeUpload function
const processUpload = async (upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
  };



const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
        //GRIDFS
        const data = await connection()
        const { stream, filename, mimetype, encoding } = await file;
        const gridFsBucket = new mongoose.mongo.GridFSBucket(data);
        const uploadStream = gridFsBucket.openUploadStream(filename);
        await new Promise((resolve, reject) => {
            stream
              .pipe(uploadStream)
              .on("error", reject)
              .on("finish", resolve);
          });
          return { id: uploadStream.id, filename, mimetype, encoding }

    //   // Creates an images folder in the root directory
    //   mkdir("images", { recursive: true }, (err) => {
    //     if (err) throw err;
    //   });


    //   // Process upload
    //   const upload = await processUpload(file);

    //   //save our file to mongodb
    //   await File.create(upload)


    //   //TODO 
    //   //the line above stores the location of the required image in mongodb i want to store the actual file


    //   return upload;
    },
  },
};

module.exports = resolvers;
