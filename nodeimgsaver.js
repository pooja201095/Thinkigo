const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const {spawn} = require('child_process');
let personobj=[];

// app.use(bodyParser.urlencoded({ extended: true }),express.static('./public')); 
app.use(express.static('./'));

app.use(express.urlencoded({limit: '50mb', extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json({limit: '50mb'}));

let base64String;
app.post('/',(req,res)=> {
    base64String = req.body.myData;
    let base64Image = base64String.split(';base64,').pop();

fs.writeFile('./images/image.png', base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});

// spawn new child process to call the python script
const python = spawn('python', ['demo.py']);

// ############################ //
python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data.toString());
    personobj = data.toString();
   });
   // in close event we are sure that stream is from child process is closed
   python.on('close', (code) => {
   console.log(`child process close all stdio with code ${code}`);
   });
// ############################ //

});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});