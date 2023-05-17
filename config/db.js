import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`MongoDB Connected`.bgMagenta.white))

    } catch (err) {
        console.log(`Error in MongoDB: ${err}`.bgRed.white)
    }
};

export default connectDB;