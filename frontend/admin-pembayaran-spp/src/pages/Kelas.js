import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import $ from "jquery"

export default class Kelas extends React.Component {
    constructor() {
        super()
        this.state = {
            kelas: [],
            token: "",
            action: "",
            id_kelas: "",
            nama_kelas: "",
            kompetensi_keahlian: ""
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

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelas: response.data })
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

    componentDidMount() {
        this.getKelas()
    }

    Add = () => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectedItem.id_kelas,
            nama_kelas: selectedItem.nama_kelas,
            kompetensi_keahlian: selectedItem.kompetensi_keahlian
        })
    }

    saveKelas = event => {
        event.preventDefault()
        let form = {
            id_kelas: this.state.id_kelas,
            nama_kelas: this.state.nama_kelas,
            kompetensi_keahlian: this.state.kompetensi_keahlian
        }


        let url = base_url + "/kelas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        }
        $("#modal_kelas").modal("hide")
    }

    dropKelas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/kelas/" + selectedItem.id_kelas
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="card-header">
                        <h3 className="text-center text-bold text-info mt-2"> Kelas List </h3>
                        <p className="card-text text-center">Daftar Kelas</p>
                    </div>
                    <div className="row">
                        <table className="table table-bordered table-hover text-center">
                            <thead>
                                <tr>
                                    <th>Nama Kelas</th>
                                    <th>Kompetensi Keahlian</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            {this.state.kelas.map(item => (
                                <tbody>
                                    <tr>
                                        <td>{item.nama_kelas}</td>
                                        <td>{item.kompetensi_keahlian}</td>
                                        <td>
                                            <div class="btn-group btn-group-toggle">
                                                <label class="btn btn-primary" onClick={() => this.Edit(item)} >
                                                    Edit
                                            </label>
                                                <label class="btn btn-danger" onClick={() => this.dropKelas(item)}>
                                                    Delete
                                            </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Tambah Kelas
                   </button>
                    <br></br>
                    <br></br>
                </div>

                {/* modal kelas */}
                <div className="modal fade" id="modal_kelas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Form Kelas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveKelas(ev)}>
                                    Nama Kelas
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas}
                                        onChange={ev => this.setState({ nama_kelas: ev.target.value })}
                                        required
                                    />
                                     Kompetensi Keahlian
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.kompetensi_keahlian}
                                        onChange={ev => this.setState({ kompetensi_keahlian: ev.target.value })}
                                        required
                                    />
                                    <button type="submit" className="btn btn-block btn-dark">
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