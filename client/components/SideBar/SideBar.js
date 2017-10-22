import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Stars from 'material-ui/svg-icons/action/stars';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Bagel from 'material-ui/svg-icons/image/adjust';
import People from 'material-ui/svg-icons/social/people';

class SideBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='side-bar-container'>
                <Drawer open={ true }>
                    <Link to='/'>                 
                        <MenuItem className='logo-menu-item text-center' >
                            <h3> Ya Quddus <br/> Organic Bagelry</h3>
                            <div className='logo-backdrop'></div>
                            <img src='/images/ya_quddus_bagels_logo.jpg' style={{ height: 90, width: '100%' }} />
                        </MenuItem>
                    </Link>

                    <Link to='/'>                 
                        <MenuItem primaryText='Bagels' leftIcon={ <Bagel /> } />
                    </Link>
                    
                    <Link to='/cart'>                 
                        <MenuItem primaryText={ <span>
                                                  Shopping Cart <i>{ this.props.cart.length }</i>
                                                </span> } 
                                  leftIcon={ <Cart /> } />
                    </Link>

                    <Link to='/reviews'>                 
                        <MenuItem primaryText='Reviews' leftIcon={ <Stars /> } />
                    </Link>

                    <Link to='/contact'>                 
                        <MenuItem primaryText='Contact' leftIcon={ <People /> } />
                    </Link>
                </Drawer>   
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default connect(mapStateToProps)(SideBar);