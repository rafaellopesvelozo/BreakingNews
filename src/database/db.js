import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait connect to the database");

  mongoose
    .connect(
      "mongodb+srv://root:admin@cluster0.1u8hfux.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("mongoDb atlas Connected"))
    .catch((err) => console.log("erro  => :" + err));
};

export default connectDatabase;
