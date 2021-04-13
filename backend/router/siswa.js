const express = require("express")
// const { where } = require("sequelize/types")
const app = express()

//call model
const siswa = require("../models/index").siswa

//library untuk upload file
const multer = require("multer")//multer digunakan untuk membaca data request dari form-data
const path = require("path")//path untuk menage alamat direktori file
const fs = require("fs")// fs atau fole stream digunakan untuk manage file

//---------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image")
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
}) 

const upload = multer({storage:storage})
//---------------------------------------------------------------------------------------------


//midleware for allow the request
app.use(express.urlencoded({extended:true}))

//verify token
const verifyToken = require("./verifyToken")
app.use(verifyToken)

app.get("/", async(req, res) => {
    siswa.findAll({
        include: ["kelas","spp"]
    })
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("image") , async(req, res) => {
    //tampung data request
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        image: req.file.filename
    }

    siswa.create(data)
    .then(result => {
        res.json({
            message: "data telah di masukan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", upload.single("image") ,async(req, res) => {
    //tampung data request
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp
    }
        
    let param = {
        nisn: req.body.nisn
    }
//---------------------------------------------------------------------------------------------
    //cek data image                                                                           
    if (req.file) {
        let oldsiswa = await siswa.findOne({where: param})
        let oldImage = oldsiswa.image

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    siswa.update(data,{where : param})
    .then(result => {
        res.json({
            message: "data telah di update",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:nisn", async(req, res) => {
    let nisn = req.params.nisn
    let perameter = {
        nisn: nisn
    }

//---------------------------------------------------------------------------------------------

    let oldsiswa = await siswa.findOne({where: perameter})
    let oldImage = oldsiswa.image

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    siswa.destroy({where : perameter})
    .then(result => {
        res.json({
            message: "data telah di hapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app