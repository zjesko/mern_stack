import React, {Component} from 'react';
import axios from 'axios';

export default class DispatchOrder extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            package: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePackage = this.onChangePackage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePackage(event) {
        this.setState({ package: event.target.value });
    }

    
    onSubmit(e) {
        e.preventDefault();

        const dispatchorder = {
            username: this.state.username,
            package: this.state.package
        }

        axios.post('http://localhost:4000/user/dispatch', dispatchorder)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            package: ''
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
                        <label>PackageID: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.package}
                               onChange={this.onChangePackage}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="DispatchOrder" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}