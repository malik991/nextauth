import mongoose from "mongoose";

export async function connect() {
  try {
    // await mongoose.connect(process.env.MONGO_DB_URI!).then(() => {
    //   console.log("db connected successfully");
    // });
    mongoose.connect(process.env.MONGO_DB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("something is wrong with db connection", error);
  }
}
