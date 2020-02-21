import React, {Component} from 'react';
import axios from 'axios';

export default class PackageSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            sort_by: '',
            search: '',
            asc: 1,
            order: 0
        }

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeAsc = this.onChangeAsc.bind(this);
        this.onChangeO = this.onChangeO.bind(this);

    }
    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }
    onChangeSort(event) {
        this.setState({ sort_by: event.target.value });
    }
    onChangeAsc(event) {
        this.setState({ asc: event.target.value });
    }
    onChangeO(event) {
        this.setState({ order: event.target.value });
    }

    
    onSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:5000/api/products/?' + 'sort_by=' + this.state.sort_by + '&' + 'asc=' + this.state.asc + '&'+'search=' + this.state.search , {
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
        .then (res => this.setState({list: res.data}));

    }
    onSubmit2(e) {
        // e.preventDefault();
        console.log(sessionStorage.getItem('token'));
        const newOrder = {
            product: e.target.id, 
            quantity: this.state.order
        }
        console.log(newOrder);
        axios.post('http://localhost:5000/api/orders', newOrder, {
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
            .then (res => console.log(res));

    }
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Search: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.search}
                                onChange={this.onChangeSearch}
                                />
                        </div>
                        <div className="form-group">
                            <label>Sort By (bundle_price, bundle_quantity, avg_rating): </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.sort_by}
                                onChange={this.onChangeSort}
                                />
                        </div>
                        <div className="form-group">
                            <label>Ascending (1, -1): </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.asc}
                                onChange={this.onChangeAsc}
                                />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Go" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bundle Left</th>
                                <th>Bundle Price</th>
                                <th>Vendor</th>
                                <th>Order</th>
                                <th>Quantity</th>
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
                                        <td>{currentUser.vendor}</td>
                                        {/* <button type="submit" className = "btn btn-primary">Sign-Up</button> */}
                                        <td><button id = {currentUser._id} type="submit" className = "btn btn-primary" onClick={this.onSubmit2}>Order</button></td>
                                        <td><div className="form-group">
                                            <label>Quantity: </label>
                                                <input type="number" 
                                                className="form-control" 
                                                value={this.state.order}
                                                onChange={this.onChangeO}
                                            />
                                        </div></td>
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