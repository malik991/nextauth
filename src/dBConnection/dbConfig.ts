import mongoose from "mongoose";

export async function connect() {
  console.log("connect called");

  try {
    await mongoose.connect(process.env.MONGO_DB_URI!);
    //console.log("check connection: ", checkConnection);

    const connection = mongoose.connection;
    //console.log("connction: ", connection);

    connection.on("connected", () => {
      console.log("db connected successfully");
    });
    connection.on("error", (err: any) => {
      console.log(
        "Mongodb connection error,please make sure mongodb server is up and running",
        err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("something is wrong with db connection", error);
  }
}
