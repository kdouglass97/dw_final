const express = require("express"); 
const app = express();
//cors
const cors = require("cors");
const PORT = 4000;

app.use(cors());

app.get("/api/home", (req,res) => {
    res.json({message: "Hello world",moose:["mike","joe","xiao"]});
});


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});