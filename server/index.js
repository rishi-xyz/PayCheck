const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin:"http://localhost:5173/"
}));
app.use("/api/v1",rootRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});