import React from "react"
import Navbar from "../component/Navbar"
import ListSiswa from "../component/ListSiswa"
import axios from "axios"
import { base_url, image_url } from "../config.js"
import $ from "jquery"

export default class Siswa extends React.Component {
    constructor() {
        super()
        this.state = {
            siswa: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            username: "",
            password: "",
            image: "",
            fillPassword: true,
            uploadFile: true,
            dataSPP: [],
            kelas: []
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)

    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswa: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ dataSPP: response.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelas: response.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getSiswa()
        this.getSpp()
        this.getKelas()
    }

    Add = () => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            username: "",
            password: "",
            image: null,
            fillPassword: true,
            uploadFile: true,

        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,
            id_spp: selectedItem.id_spp,
            username: selectedItem.username,
            password: "",
            image: null,
            fillPassword: false,
            uploadFile: false
        })
    }

    saveSiswa = event => {
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = new FormData()
        form.append("nisn", this.state.nisn)
        form.append("nis", this.state.nis)
        form.append("nama", this.state.nama)
        form.append("id_kelas", this.state.id_kelas)
        form.append("alamat", this.state.alamat)
        form.append("no_telp", this.state.no_telp)
        form.append("id_spp", this.state.id_spp)
        form.append("username", this.state.username)

        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }

        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            console.log("update");
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
    }

    dropSiswa = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div className="siswa">
                { <Navbar /> }
                <div className="container">
                    <div className="card-header">
                        <h3 className="text-center text-bold text-info mt-2"> Siswa List</h3>
                        <p className="card-text text-center">Daftar Data Siswa</p>
                    </div>
                    <div className="row">
                        {this.state.siswa.map(item => (
                            <ListSiswa
                                key={item.nisn}
                                nisn={item.nisn}
                                nis={item.nis}
                                nama={item.nama}
                                no_telp={item.no_telp}
                                alamat={item.alamat}
                                image={image_url + "/" + item.image}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropSiswa(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Siswa
                    </button>
                </div>

                {/* modal siswa */}
                <div className="modal fade" id="modal_siswa">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h4>Form Siswa</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSiswa(ev)}>
                                    NISN
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({ nisn: ev.target.value })} />

                                    NIS
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange={ev => this.setState({ nis: ev.target.value })} />

                                    Nama Siswa
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })} />

                                    Kelas
                                    <div className="form-group">
                                        <select name="kelas" id="kelas" className="form-control" id="exampleFormControlSelect1">
                                            {this.state.kelas.map((v, i) => (
                                                <option selected key={i} value={v.id_kelas}>
                                                    {v.nama_kelas}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    Alamat
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({ alamat: ev.target.value })} />

                                    Telepon
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.no_telp}
                                        onChange={ev => this.setState({ no_telp: ev.target.value })} />

                                    Jumlah Spp
                                    <div className="form-group">
                                        <select name="spp" id="spp" className="form-control" id="exampleFormControlSelect1">
                                            {this.state.dataSPP.map((v, i) => (
                                                <option selected key={i} value={v.id_spp}>
                                                    {v.nominal}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    Username
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })} />

                                    {this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({ uploadFile: true })}>
                                            Change Siswa Image
                                        </button>
                                    ) : (
                                        <div>
                                            Siswa Image
                                            <input type="file" className="form-control mb-1"
                                                onChange={ev => this.setState({ image: ev.target.files[0] })}
                                                required />
                                        </div>
                                    )}

                                    {this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({ fillPassword: true })}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({ password: ev.target.value })}
                                                required />
                                        </div>
                                    )}

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}