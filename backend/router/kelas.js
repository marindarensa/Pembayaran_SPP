const express = require("express")
// const { where } = require("sequelize/types")
const app = express()

//call model
const kelas = require("../models/index").kelas


//midleware for allow the request
app.use(express.urlencoded({extended:true}))

//verify token
const verifyToken = require("./verifyToken")
app.use(verifyToken)


app.get("/", async(req, res) => {
    kelas.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async(req, res) => {
    //tampung data request
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    kelas.create(data)
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

app.put("/", async(req, res) => {
    //tampung data request
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
        
    let param = {
        id_kelas: req.body.id_kelas
    }

    kelas.update(data,{where : param})
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

app.delete("/:id_kelas", async(req, res) => {
    let id_kelas = req.params.id_kelas
    let perameter = {
        id_kelas: id_kelas
    }

    kelas.destroy({where : perameter})
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