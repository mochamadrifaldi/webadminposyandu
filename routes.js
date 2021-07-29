// kode lain
const ObjectId = require('mongodb').ObjectId

const client = require('./connection')
var express = require('express')
var app = express()
var session = require("express-session");
var formidable = require("formidable")
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
    if (req.session && req.session.admin)
      return next();
    else
        return res.send("no session")
  };

app.use(express.static(__dirname + '/views'));
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
// kode lain

app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname+"/views/index.html");
});

app.get('/bayi', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('bayi').find({ is_bayi: true, is_aktif: true}).toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.get('/balita', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('bayi').find({ is_bayi: false, is_aktif: true }).toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/bayi/:nama_bayi/:nik/:ttl/:nama_ibu/:is_bayi', async (req, res) => {
    if (client.isConnected()) {
        var is_bayi = false
        if (req.params.is_bayi == 'true'){
            is_bayi = true;
        }
    const { nama_bayi, nik, ttl, nama_ibu } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').insertOne({
    nama_bayi: req.params.nama_bayi,
    nik: req.params.nik,
    ttl: req.params.ttl,
    nama_ibu: req.params.nama_ibu,
    is_bayi: is_bayi,
    is_aktif: true
    })
    if (result.insertedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.post('/balita/:nama_bayi/:nik/:ttl/:nama_ibu/:is_bayi', async (req, res) => {
    if (client.isConnected()) {
        var is_bayi = true
        if (req.params.is_bayi == 'false'){
            is_bayi = false;
        }
    const { nama_bayi, nik, ttl, nama_ibu } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').insertOne({
    nama_bayi: req.params.nama_bayi,
    nik: req.params.nik,
    ttl: req.params.ttl,
    nama_ibu: req.params.nama_ibu,
    is_bayi: is_bayi,
    is_aktif: true
    })
    if (result.insertedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/bayi/:nama_bayi/:nik/:ttl/:nama_ibu/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            nama_bayi: req.params.nama_bayi,
            nik: req.params.nik,
            ttl: req.params.ttl,
            nama_ibu: req.params.nama_ibu
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

   app.put('/balita/:nama_bayi/:nik/:ttl/:nama_ibu/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            nama_bayi: req.params.nama_bayi,
            nik: req.params.nik,
            ttl: req.params.ttl,
            nama_ibu: req.params.nama_ibu
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/bayi/:_id', async (req, res) => {
    if (client.isConnected()) {

    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            is_aktif: false
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/balita/:_id', async (req, res) => {
    if (client.isConnected()) {

    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            is_aktif: false
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.delete('/bayi/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama, email } = req.body
    const db = client.db('wpu')
    const result = await db.collection('bayi').deleteOne(
        { _id: ObjectId(req.params._id) }
        )          
    if (result.deletedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.get('/bayibalita', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('bayi').find({is_aktif: true}).toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.get('/getbayicount', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('bayi').find({is_aktif: true}).toArray()
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.get('/getibuhamilcount', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('ibu_hamil').find({is_aktif: true}).toArray()
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.get('/laporan', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('laporan').aggregate([
            {$match:{'is_aktif': true}},
            { "$addFields": { "_idBayi": { "$toObjectId": "$idbayibalita" }}},
            { $lookup:
               {
                 from: 'bayi',
                 localField: '_idBayi',
                 foreignField: '_id',
                 as: 'bayi'
               }
             }
            ]).sort({date:-1}).toArray();      
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/pemeriksaan/:idbayibalita/:bb/:tb/:kategori/:imunisasi/:keterangan', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu } = req.body
    const db = client.db('wpu')
    const result = await db.collection('laporan').insertOne({
    idbayibalita: req.params.idbayibalita,
    bb: req.params.bb,
    tb: req.params.tb,
    kategori: req.params.kategori,
    imunisasi: req.params.imunisasi,
    keterangan: req.params.keterangan,
    date:new Date(),
    is_aktif: true
    })
    if (result.insertedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/laporan/:_id', async (req, res) => {
    if (client.isConnected()) {

    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('laporan').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            is_aktif: false
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })


app.delete('/laporan/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama, email } = req.body
    const db = client.db('wpu')
    const result = await db.collection('laporan').deleteOne(
        { _id: ObjectId(req.params._id) }
        )          
    if (result.deletedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.get('/ibuhamil', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('ibu_hamil').find({is_aktif: true}).toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/ibuhamil/:nama_ibu_hamil/:nik/:ttl/:nama_suami', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu } = req.body
    const db = client.db('wpu')
    const result = await db.collection('ibu_hamil').insertOne({
    nama_ibu_hamil: req.params.nama_ibu_hamil,
    nik: req.params.nik,
    ttl: req.params.ttl,
    nama_suami: req.params.nama_suami,
    is_aktif: true
    })
    if (result.insertedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/ibuhamil/:nama_ibu_hamil/:nik/:ttl/:nama_suami/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('ibu_hamil').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            nama_ibu_hamil: req.params.nama_ibu_hamil,
            nik: req.params.nik,
            ttl: req.params.ttl,
            nama_suami: req.params.nama_suami
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/ibuhamil/:_id', async (req, res) => {
    if (client.isConnected()) {

    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('ibu_hamil').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            is_aktif: false
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.get('/jadwal', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('jadwal_posyandu').find({is_aktif: true}).toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/jadwal/:tanggal/:nama_bidan', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu } = req.body
    const db = client.db('wpu')
    const result = await db.collection('jadwal_posyandu').insertOne({
    tanggal: req.params.tanggal,
    nama_bidan: req.params.nama_bidan,
    is_aktif: true
    })
    if (result.insertedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/jadwal/:tanggal/:nama_bidan/:_id', async (req, res) => {
    if (client.isConnected()) {
    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('jadwal_posyandu').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            tanggal: req.tanggal,
            nama_bidan: req.params.nama_bidan
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.put('/jadwal/:_id', async (req, res) => {
    if (client.isConnected()) {

    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('jadwal_posyandu').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            is_aktif: false
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.get('/marquee', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('marquee').find().toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.put('/marquee/:_id/:parteks', async (req, res) => {
    if (client.isConnected()) {
    var varteks =  req.params.parteks
    const { nama_bayi, nik, ttl, nama_ibu, _id } = req.body
    const db = client.db('wpu')
    const result = await db.collection('marquee').updateOne(
        { _id: ObjectId(req.params._id) },
        {
        $set: { 
            teks: varteks
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send("berhasil")
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.get('/gambar', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('gambar').find().toArray()        
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/views/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        const db = client.db('wpu')
        const result = db.collection('gambar').insertOne({
            gambar: file.name
        })
        if (result.insertedCount == 1) {
            res.send("berhasil")
        } else {
            res.send({
                status: 'warning',
                message: 'tambah data gagal',
            })
        }
    });

app.delete('/gambarthumbnail/:id', async (req, res) => {
    if (client.isConnected()) {
        const { nama, email } = req.body
        const db = client.db('wpu')
        const result = await db.collection('gambar').deleteOne(
            { _id: ObjectId(req.params.id) }
        )          
        if (result.deletedCount == 1) {
            res.send("berhasil")
        } else {
            res.send("gagal")
        }
        
    } else {
        res.send("gagal")
    }
})



    //res.send("upload berhasil")
});


app.get('/login/:username/:pass', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const user = await db.collection('user').findOne({username : req.params.username, 
        pass : req.params.pass})         
        if (user){
            req.session.user =  req.params.username;
            req.session.admin = true;
            res.send("berhasil")
        }else{
            res.send("gagal")
        }
        
    } else {
    res.send('koneksi database gagal')
    }
   })

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    res.send(req.session.user);
});

app.get('/mahasiswa', async (req, res) => {
    if (client.isConnected()) {
        const db = client.db('wpu')
        const products = await db.collection('mahasiswa').find().toArray()         
        res.send(products)
    } else {
    res.send('koneksi database gagal')
    }
   })

app.post('/mahasiswa', async (req, res) => {
    if (client.isConnected()) {
    const { nama, email } = req.body
    const db = client.db('wpu')
    const result = await db.collection('mahasiswa').insertOne({
    nama: nama,
    email: email
    })
    if (result.insertedCount == 1) {
    res.send({
    status: 'success',
    message: 'tambah data success',
    })
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })



app.put('/mahasiswa/:id', async (req, res) => {
    if (client.isConnected()) {
    const { nama, email } = req.body
    const db = client.db('wpu')
    const result = await db.collection('mahasiswa').updateOne(
        { _id: ObjectId(req.params.id) },
        {
        $set: { 
            nama: nama,
            email: email
            }
            }
            )
                  
    if (result.matchedCount == 1) {
    res.send({
    status: 'success',
    message: 'tambah data success',
    })
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })

app.delete('/mahasiswa/:id', async (req, res) => {
    if (client.isConnected()) {
    const { nama, email } = req.body
    const db = client.db('wpu')
    const result = await db.collection('mahasiswa').deleteOne(
        { _id: ObjectId(req.params.id) }
        )          
    if (result.deletedCount == 1) {
    res.send({
    status: 'success',
    message: 'tambah data success',
    })
    } else {
    res.send({
    status: 'warning',
    message: 'tambah data gagal',
    })
    }
    
    } else {
    res.send({
    status: 'error',
    message: 'koneksi database gagal'
    })
    }
   })
   