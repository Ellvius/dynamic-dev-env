import mongoose from "mongoose"

const connectDatabase = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/dockerusers")
    .then(() => console.log("Connected to mongoose"))
    .catch(err => console.log(err));
}

export default connectDatabase;


