const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

const PORT = process.env.PORT || 3007;

const logReq = require("./middleware/logRequest");

app.use(logReq);
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use("/api",notesRoutes)
app.use("/", htmlRoutes)

app.listen( PORT,()=>{
    console.log("listening to port "+ PORT)
})