import React, {Component} from 'react';
import axios from 'axios';

export default class CreatePackage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            bundle_quantity: 0,
            bundle_price: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ bundle_quantity: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ bundle_price: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const CreatePackage = this.state;
        console.log(sessionStorage.getItem('token'))
        axios.post('http://localhost:5000/api/products/', CreatePackage, {
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
            .then  (res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />  
                    </div>

                    <div className="form-group">
                        <label>Bundle Quantity: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.bundle_quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>

                    <div className="form-group">
                        <label>Bundle Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.bundle_price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="CreatePackage" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}