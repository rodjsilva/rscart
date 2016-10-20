import React from 'react';
import data from '../../data/products.json';
import NumericInput from 'react-numeric-input';
var update = require('react-addons-update');

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.setState({
            items: update(this.state.items, {$push: data.products})
        })
    }

    setQuantity(item, value){
        item.qty = value;
    }

    render() {
        var _this = this;
        var itemList = this.state.items.map(function (item) {
            return(
                <div key={item.id} className="row form-group">
                    <div className="col-md-3">{item.name}</div>
                    <div className="col-md-3"><NumericInput className="form-control" type="text" value="0" min={0} onChange={_this.setQuantity.bind(_this, item)}></NumericInput></div>
                    <div className="col-md-3"> (£{item.price.toFixed(2)} each)</div>
                    <div className="col-md-1"><button type="button" className="btn" onClick={_this.props.handleClick.bind(_this, item)}>Add to cart</button></div>
                </div>
            );

        });
        var list = (<div className="well col-md-6">{itemList}</div>);
        var emptyList = (<div>List is Empty</div>);
        return (itemList.length > 0 ? list : emptyList);
    }
}

export default ProductList;