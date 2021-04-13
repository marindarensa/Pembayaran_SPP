import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Siswa from "./pages/Siswa"
import Kelas from "./pages/Kelas"
import Pembayaran from "./pages/Pembayaran"
import Petugas from "./pages/Petugas"

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/siswa" component={Siswa} />
        <Route path="/kelas" component={Kelas} />
        <Route path="/pembayaran" component={Pembayaran} />
        <Route path="/petugas" component={Petugas} />
      </Switch>
    )
  }
}
