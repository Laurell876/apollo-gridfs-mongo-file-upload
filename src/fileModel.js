

const {Schema,model} = require("mongoose")

const fileSchema = new Schema({
    filename: String,
    mimetype: String,
    path: String,
  });

  const FileModel = model("File", fileSchema)

  module.exports = FileModel