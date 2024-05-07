import mongoose from "mongoose";
export const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo connected with server: ${data.connection.host}`);
    }).catch(err => console.log(err))
};

