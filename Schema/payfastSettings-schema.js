const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: mongoose.SchemaTypes.String,
  required: true,
};

let schema = new Schema({
  _id: reqString,
  channelId: reqString,
  payfastKey: reqString,
  cancelurl: {
    type: mongoose.SchemaTypes.String,
  },
  returnurl: {
    type: mongoose.SchemaTypes.String,
  },
});
module.exports = mongoose.model("payfastSettings", schema);
