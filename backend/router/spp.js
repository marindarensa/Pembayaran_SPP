const express = require("express")
// const { where } = require("sequelize/types")
const app = express()

//call model
const spp = require("../models/index").spp


//midleware for allow the request
app.use(express.urlencoded({extended:true}))

//verify token
const verifyToken = require("./verifyToken")
app.use(verifyToken)


app.get("/", async(req, res) => {
    spp.findAll()
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
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    spp.create(data)
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
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
        
    let param = {
        id_spp: req.body.id_spp
    }

    spp.update(data,{where : param})
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

app.delete("/:id_spp", async(req, res) => {
    let id_spp = req.params.id_spp
    let perameter = {
        id_spp: id_spp
    }

    spp.destroy({where : perameter})
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