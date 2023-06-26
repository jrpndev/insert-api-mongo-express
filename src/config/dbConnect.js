import mongoose from "mongoose"

mongoose.connect("mongodb+srv://jrpcodes:asafugaz394@jrui7977.6puctqf.mongodb.net/Library");

let db = mongoose.connection;

export default db;