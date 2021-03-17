const express = require("express")
const moment = require("moment")
// const { where } = require("sequelize/types")
const app = express()

//call model
const pembayaran = require("../models/index").pembayaran


//midleware for allow the request
app.use(express.urlencoded({extended:true}))

//verify token
const verifyToken = require("./verifyToken")
app.use(verifyToken)


app.get("/", async(req, res) => {
    pembayaran.findAll({
        include: ["petugas","siswa","spp"]
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

app.post("/", async(req, res) => {
    //tampung data request
    let data = {
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.create(data)
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
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: moment().format('YYYY-MM-DD HH:mm:ss'),
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
        
    let param = {
        id_pembayaran: req.body.id_pembayaran
    }

    pembayaran.update(data,{where : param})
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

app.delete("/:id_pembayaran", async(req, res) => {
    let id_pembayaran = req.params.id_pembayaran
    let perameter = {
        id_pembayaran: id_pembayaran
    }

    pembayaran.destroy({where : perameter})
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