const express = require("express")
const app = express()
const cors = require ("cors")
app.use(cors())

//call router
let petugas = require("./router/petugas")
let kelas = require("./router/kelas")
let spp = require("./router/spp")
let siswa = require("./router/siswa")
let pembayaran = require("./router/pembayaran")
let auth = require("./router/auth")

app.use("/petugas", petugas)
app.use("/kelas", kelas)
app.use("/spp", spp)
app.use("/siswa", siswa)
app.use("/pembayaran", pembayaran)
app.use("/auth", auth)

app.listen(8000, ()=> {
    console.log(`server berjalan di port 8000`)
})