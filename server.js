
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");


//dotenv config
dotenv.config();

//MongoDB Connection
connectDB();

//rest object
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//test server
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server started successfully!!!" })

})

//routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes)


//Port
const PORT = process.env.PORT;

//listen

app.listen(PORT, console.log(`server started in locslhost: ${process.env.PORT}`));
