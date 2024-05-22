import mongoose from "mongoose";
const connectDatabase = () => {
  mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo connected with server: ${data.connection.host}`);
    }).catch(err => console.log(err))
  };
  
  export default connectDatabase
