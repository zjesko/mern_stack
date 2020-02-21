import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // const Login = {
        //     email: this.state.email,
        //     password: this.state.password
        // }

        axios.post('http://localhost:5000/api/users/login', this.state)
             .then  (res => {
                sessionStorage.setItem('token', res.data.token) 
                sessionStorage.setItem('vendor', res.data.user.vendor) 
                console.log(res.data.user.vendor);
                if(res.data.user.vendor){
                    this.props.history.push('/createPackage')
                }
                else {
                    this.props.history.push('/packagesearch')
                }
            })
            .catch(err => {
                console.log(err.response);
                alert('login error');
            })

            // this.state.users.map(currentvendor => {
                
            //         if(currentvendor.vendor === true){
            //             console.log("vendor");
            //         }
            //         else{
            //             console.log("user");
            //         }
                
            // })

        // this.setState({
        //     email: '',
        //     password: ''
        // });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}