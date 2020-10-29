import mongoose from "mongoose";

try {
    mongoose.connect(
        process.env.CONNECTION_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
        () => console.log("DB CONNECTED")
    );
} catch (error) {
    console.log("Error connecting to database: ", error);
}
