import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './components/Cart.jsx';
import ProductList from './components/ProductList.jsx';
var update = require('react-addons-update');
//var myCart;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.AddToCart = this.AddToCart.bind(this);
    }

    AddToCart(item){
        console.log("Add > " + item.id);
        this.refs.cart.addItem(item);
    }

    render () {
        return (
            <form>
                <div className="form-group">
                    <ProductList handleClick={this.AddToCart}/>
                    <Cart ref="cart"/>
                </div>
            </form>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));