import React, {Component} from 'react';
import axios from 'axios';

export default class WaitingOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
        }

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:5000/api/products/'  + e.target.id, {
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
            .then(res => {
                console.log(res.data);
            })

    }
    componentDidMount(e) {
        // e.preventDefault();
        console.log(sessionStorage.getItem('token'));
        axios.get('http://localhost:5000/api/products/waiting', {
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
            .then (res => this.setState({list: res.data}));

    }
    render() {
        return (
            <div>
                <div>
                    {/* <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Userame: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="PlacedOrders" className="btn btn-primary"/>
                        </div>
                    </form> */}
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bundle Left</th>
                                <th>Bundle Price</th>
                                <th>Status</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.list.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.name}</td>
                                        <td>{currentUser.bundle_quantity}</td>
                                        <td>{currentUser.bundle_price}</td>
                                        <td>{currentUser.status}</td>
                                        {/* <button type="submit" className = "btn btn-primary">Sign-Up</button> */}
                                        <td><button id = {currentUser._id} type="submit" className = "btn btn-primary" onClick={this.onSubmit}>Cancel</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}