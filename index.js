const express = require("express"); //importing 'express' to server
const { request } = require("http");
const mydb = require("mysql2");   //importing 'mydb' to server
const app = express(); //named the name server as 'app'
//import path to define path later on
const path = require("path");

app.use(express.urlencoded({extended: true})); //data in the form of query strings in address bar (e.g., name = x)
app.use(express.json()); //request changed in json format
app.use(express.static(path.join(__dirname, "public"))); //render HTML file

// declare parameters for connection to RDS
const db = mydb.createConnection({
    host: "threetierarch.cte9rejbugql.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Qwerty123#",
    database: "resellerform"
});

// establish connection to RDS
db.connect(
    err => {
        if (err) throw err;
        console.log("Connected to mysql RDS")
    }
)

//form submission handling
app.post("/submit", (req, res) => {
const {
    name, tel, email, date
} = req.body
const sql = `
    INSERT INTO STUDENT
    (name, tel, email, date)
    VALUES(?, ?, ?, ?)

`;

db.query(sql, [name, tel, email, date], (err) => 
{
    if (err) throw err;
    res.send("Form Submitted Successfully!")
}
);

});


//running nodejs server on port 8080 (8080 is a sudo HTTP port)
app.listen(8080, () => //app.listen runs the server on port 8080
{
    console.log("Server is running on port 8080") //ouput when server runs successfully
})