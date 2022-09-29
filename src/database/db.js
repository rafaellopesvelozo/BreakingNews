import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait connect to the database");

  mongoose
    .connect( process.env.MONGODB_URI ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("mongoDb atlas Connected"))
    .catch((err) => console.log("erro  => :" + err));
};

export default connectDatabase;
