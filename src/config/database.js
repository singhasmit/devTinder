const mongoose= require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://asmitsingh778:9695Cps227012@namastenode.aksqk5s.mongodb.net/devTinder",
  );
};

module.exports = connectDB;