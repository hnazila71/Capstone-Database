const express = require('express');
<<<<<<< HEAD
const multer = require('multer');
const authRoutes = require('./routes/auth');
const db = require('./config/db');
const { Storage } = require('@google-cloud/storage');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const upload = multer ({
  storage:multer.memoryStorage()
 })

// Middleware
app.use(express.json());
app.use(authRoutes);


// File upload route
app.post('/upload',upload.single('file'),async(req, res) => {
    const file = req.file
    if (!file){
      res.status(400).send("NO FILE UPLOADED")
    }
    const fileName = Date.now() + "-" + file.originalname

    //convert this to blob
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream({
      metadata:{
        contentType:file.mimetype
      }
    })
    blobStream.on('error',(err) => {
      res.status(500).send(err)
    })
    blobStream.on('finish',() =>{
      res.redirect('file-uploaded')
    })
    blobStream.end(file.buffer)
});

=======
const app = express();
const authRoutes = require('./routes/auth');
const db = require('./config/db');


app.use(express.json());
app.use(authRoutes);

>>>>>>> bebc15d9e923c4cce9750ec6fcab3d29bbd81a57
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  db.execute('SELECT 1')
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
    });
<<<<<<< HEAD
});

// Cloud storage connection
const storage = new Storage({
  keyFilename: "key.json"
});

const bucketName = "uploadmdtoml"
const bucket = storage.bucket(bucketName)
=======
});
>>>>>>> bebc15d9e923c4cce9750ec6fcab3d29bbd81a57
