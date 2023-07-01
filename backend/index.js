const express = require("express");
const app = express();
const port = 5000;

//connect to database
const mongoDB = require("./db");
mongoDB();

//CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

//all the other Routes are placed in other directory
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))



//landing page for server
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
