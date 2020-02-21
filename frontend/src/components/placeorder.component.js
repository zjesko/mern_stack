import React, {Component} from 'react';
import axios from 'axios';

export default class PlaceOrder extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            name: '',
            vendor: '',
            num:''
        }

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeNum = this.onChangeNum.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUser(event) {
        this.setState({ user: event.target.value });
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeVendor(event) {
        this.setState({ vendor: event.target.value });
    }
    onChangeNum(event) {
        this.setState({ num: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const placeorder = {
            user: this.state.user,
            name: this.state.name,
            vendor: this.state.vendor,
            num: this.state.num
        }

        axios.post('http://localhost:4000/order/add', placeorder)
             .then(res => console.log(res.data));

        this.setState({
            user: '',
            name: '',
            vendor: '',
            num:''
        });
    }

    render() {
        return (
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
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.vendor}
                               onChange={this.onChangeVendor}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Number: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.num}
                               onChange={this.onChangeNum}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="PlaceOrder" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}