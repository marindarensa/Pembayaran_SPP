const express = require("express")
const md5 = require("md5")
// const { where } = require("sequelize/types")
const app = express()

//call model
const petugas = require("../models/index").petugas

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
    petugas.findAll()
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
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
        image: req.file.filename
    }

    petugas.create(data)
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

app.put("/", upload.single("image") , async(req, res) => {
    //tampung data request
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
        
    let param = {
        id_petugas: req.body.id_petugas
    }
//---------------------------------------------------------------------------------------------
    //cek data image                                                                           
    if (req.file) {
        let oldpetugas = await petugas.findOne({where: param})
        let oldImage = oldpetugas.image

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    petugas.update(data,{where : param})
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

app.delete("/:id_petugas", async(req, res) => {
    let id_petugas = req.params.id_petugas
    let perameter = {
        id_petugas: id_petugas
    }

//---------------------------------------------------------------------------------------------

let oldpetugas = await petugas.findOne({where: perameter})
let oldImage = oldpetugas.image

//delete file lama
let pathfile = path.join(__dirname,"../image",oldImage)
fs.unlink(pathfile, error => console.log(error))

data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    petugas.destroy({where : perameter})
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