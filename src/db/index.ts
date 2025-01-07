import { set, connect } from "mongoose";

set("strictQuery", true);

export const connectDB = () => {
  connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
