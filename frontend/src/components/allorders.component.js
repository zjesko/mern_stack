import React, {Component} from 'react';
import axios from 'axios';

export default class AllOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            users: [],
        }

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUser(event) {
        this.setState({ user: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
        }

        axios.get('http://localhost:4000/user/order/'  + this.state.user)
            .then(res => {
                console.log(res.data);
                this.setState({users: res.data});
            })

        this.setState({
            user: ''
        });
    }
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>User: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.user}
                                onChange={this.onChangeUser}
                                />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="AllOrders" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Name</th>
                                <th>Vendor</th>
                                <th>Num</th>
                                <th>Package</th>

                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.users.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser._id}</td>
                                        <td>{currentUser.user}</td>
                                        <td>{currentUser.name}</td>
                                        <td>{currentUser.vendor}</td>
                                        <td>{currentUser.num}</td>
                                        <td>{currentUser.package}</td>

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