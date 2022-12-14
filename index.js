const express = require('express');
const fs=require('fs');
const dotenv = require('dotenv')
const app = express();

dotenv.config();
const PORT = process.env.PORT;

const date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2)
console.log(date);

let hours = date_ob.getHours();
let timeStamp = date_ob.getTime();

const dateTime=date+"-"+hours;
const timeSt = timeStamp
const data = timeSt.toString();

app.use('/create',(req,res) => {
    const newFile=fs.writeFile(`./modules/.test-${dateTime}.txt`, data, (err) => {
        if (err) 
          console.log(err);
        else {
          const readFile = fs.readFileSync(`./modules/.test-${dateTime}.txt`, "utf8")
        
          const Output = [{'fileName' : `.test-${dateTime}.txt`},{'Content of the file' : `${readFile}`}]
          res.send(Output);
        }
        
      });
});

app.use('/get', (req, res) => {
    const Openfile = fs.readdir('./modules', "utf8",(err,file) => {
        console.log(file);
        res.send(file);
  }
);
})

console.log("App is running");

app.listen(PORT, () => {
    console.log(`App is running in the port ${PORT}`)
});