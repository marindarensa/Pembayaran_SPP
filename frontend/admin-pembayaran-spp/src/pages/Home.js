import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            adminName: null,
            dataPetugas: 0,
            dataKelas: 0,
            dataSpp: 0,
            dataSiswa: 0,
            dataTransaksi: 0,
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ dataPetugas: response.data.length })
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

    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ dataKelas: response.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push('/login')
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
                this.setState({ dataSpp: response.data.length })
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

    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ dataSiswa: response.data.length })
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

    getTransaksi = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ dataTransaksi: response.data.length })
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

    getAdmin = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({adminName: this.state.nama_petugas})
    }


    componentDidMount() {
        this.getKelas()
        this.getSpp()
        this.getSiswa()
        this.getPetugas()
        this.getTransaksi()
        this.getAdmin()
    }

    render() {
        return (
            <div className="home">
                 <Navbar /> 
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome Back {this.state.adminName}</strong>
                    </h3>
                    <div className="row">
                        {/* data kelas */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-white">
                                        <strong>Data Kelas</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataKelas}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* data spp */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-white">
                                        <strong>Data SPP</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataSpp}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* data siswa */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-white">
                                        <strong>Data Siswa</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataSiswa}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* data petugas */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-secondary">
                                    <h4 className="text-white">
                                        <strong>Data Petugas</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataPetugas}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* data transaksi */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-white">
                                        <strong>Data Transaksi</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataTransaksi}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}