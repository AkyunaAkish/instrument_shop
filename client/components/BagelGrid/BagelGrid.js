import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import { Thumbnail, Button } from 'react-bootstrap';

import addToCart from '../../actions/addToCart';
import removeFromCart from '../../actions/removeFromCart';

class BagelGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    hasBagel(currentBagel) {
        if(window.localStorage.bagelCart) {
            return JSON.parse(window.localStorage.bagelCart).reduce((bool, bagel) => {
                if (currentBagel.type === bagel.type) {
                    bool = true;
                }

                return bool;
            }, false);    
        } else {
            return false;
        }
    }

    renderBagels() {
        return this.props.bagels.map((bagel, ind) => {
            const hasBagel = this.hasBagel(bagel);

            return (
                <Thumbnail key={ ind } className='bagel-grid-item text-left shadow' src={ bagel.img }>
                    <h3>{ bagel.type }</h3>
                    <div>
                        <RaisedButton className='bagel-item-btn'
                                      label={ hasBagel ? 'Add another' : 'Add to Cart' }
                                      backgroundColor='rgb(70,62,63)'
                                      style={{ marginRight: 10 }}
                                      onClick={ () => this.props.addToCart(bagel) } />

                        <RaisedButton className='bagel-item-btn'
                                      label='View Info'
                                      backgroundColor='rgb(70,62,63)' />
                    </div>
                </Thumbnail>
            );
        });
    }

    render() {
        return (
            <div className='bagel-grid-container margin-center'>
                { this.renderBagels() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(BagelGrid);