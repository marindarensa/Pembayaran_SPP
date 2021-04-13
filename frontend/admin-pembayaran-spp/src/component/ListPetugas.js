import React from "react"

export default class ListPetugas extends React.Component {
    render() {
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.nama_petugas} src={this.props.image}
                            className="img rouded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7">
                        {/* description */}
                        <h5 className="text-bold">
                            Nama Petugas: {this.props.nama_petugas}
                        </h5>
                        <h6>Username: {this.props.username}</h6>
                        <h6>Level: {this.props.level}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <botton className="btn btn-cm btn-primary btn-block"
                            onClick={this.props.onEdit}>
                            Edit
                        </botton>

                        <botton className="btn btn-sm btn-danger btn-block"
                            onClick={this.props.onDrop}>
                            Delete
                        </botton>
                    </div>
                </div>
            </div>
        )
    }
}