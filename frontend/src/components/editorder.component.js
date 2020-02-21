import React, {Component} from 'react';
import axios from 'axios';

export default class EditOrder extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            package: '',
            newnum:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePackage = this.onChangePackage.bind(this);
        this.onChangeNewnum = this.onChangeNewnum.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePackage(event) {
        this.setState({ package: event.target.value });
    }

    onChangeNewnum(event) {
        this.setState({ newnum: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const editorder = {
            username: this.state.username,
            package: this.state.package,
            newnum: this.state.newnum
        }

        axios.post('http://localhost:4000/order/edit', editorder)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            package: '',
            newnum:''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Package: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.package}
                               onChange={this.onChangePackage}
                               />  
                    </div>
                    <div className="form-group">
                        <label>NewNumber: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.newnum}
                               onChange={this.onChangeNewnum}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="EditOrder" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}