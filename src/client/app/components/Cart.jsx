import React from 'react';
import NumericInput from 'react-numeric-input';
import data from '../../data/deals.json';
var update = require('react-addons-update');

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            deals: [],
            subtotal: 0,
            discounts: 0,
            total: 0
        };
    }

    componentDidMount() {
        this.setState({
            deals: update(this.state.deals, {$push: data.deals})
        })
    }

    addItem(item) {
        if(item.qty > 0) {
            var cartItem = this.state.items.find(v => v.id == item.id);
            if(cartItem) {
                cartItem.qty = cartItem.qty + item.qty;
            } else {
                this.state.items.push((JSON.parse(JSON.stringify(item))));
            }
            this.updateTotal();
        }
    }

    removeItem(item) {
        this.state.items.splice( this.state.items.indexOf(item), 1 );
        this.updateTotal();
    }

    updateTotal() {
        var _this = this;
        var total = 0;
        var subtotal = 0;
        var discounts = 0;
        this.state.items.forEach(function (item, index) {
            discounts += _this.checkPromo(item);
            subtotal += item.qty * item.price;
        });
        discounts += this.checkDeals();
        total = subtotal - discounts;
        this.setState({subtotal: subtotal});
        this.setState({discounts: discounts});
        this.setState({total: total});
    }

    setQuantity(item, value){
        item.qty = value;
        this.updateTotal();
    }

    checkPromo(item){
        var discount = 0;
        if(item.promo_message.length > 0){
            discount = item.promo_discount_amount * item.qty;
            discount += Math.round((item.price * item.promo_discount_percent / 100) * item.qty);
        }
        return discount;
    }

    checkDeals(){
        var discount = 0;
        var _this = this;
        this.state.deals.forEach(function(deal){
            var discountQty = 0;
            var dealAmount = 0;
            var productQtys = [];
            for(var x = 0; x < deal.products.length; x++){
                var cartItem = _this.state.items.find(v => v.id == deal.products[x].id);
                if(cartItem){
                    var dealQty = parseInt(cartItem.qty / deal.products[x].required_qty);
                    productQtys.push(dealQty);
                    dealAmount += cartItem.price;
                } else {
                    productQtys = [];
                    break;
                }
            }
            if(productQtys.length > 0) {
                discountQty = Math.min.apply(null, productQtys);
                var dealDiscount = discountQty * deal.discount_amount;
                dealDiscount += Math.round(dealAmount * discountQty * deal.discount_percent / 100);
                discount += dealDiscount;
            }

        });
        return discount;
    }

    render() {
        var _this = this;
        var itemList = this.state.items.map(function (item) {
            return (
                <div key={item.id} className="row form-group">
                    <div className="col-md-3">{item.name}</div>
                    <div className="col-md-3"><NumericInput className="form-control" type="text" value={item.qty} min={1} onChange={_this.setQuantity.bind(_this, item)}></NumericInput></div>
                    <div className="col-md-2">X £{item.price}</div>
                    <div className="col-md-2">= £{item.price * item.qty}</div>
                    <div className="col-md-1"><button type="button" className="btn" onClick={_this.removeItem.bind(_this, item)}>Remove</button></div>
                </div>
            );
        });
        var cart = (
            <div className="well col-md-6">
                <div>
                    <div className="well">{itemList}</div>
                </div>
                <div className="form-group">Subotal: £{this.state.subtotal}</div>
                <div className="form-group">Discounts: £{this.state.discounts}</div>
                <div className="form-group">Total: £{this.state.total}</div>
            </div>);
        var emptyCart = (
            <div className="well col-md-6">
                <div className="well">No items in the cart</div>
                <div>Total: £{this.state.total.toFixed(2)}</div>
            </div>
        );
        return (itemList.length > 0 ? cart : emptyCart);
    }
}

export default Cart;