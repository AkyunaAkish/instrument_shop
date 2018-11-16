import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import toggleSideBar from '../../actions/toggleSideBar';

import Badge from 'material-ui/Badge';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Stars from 'material-ui/svg-icons/action/stars';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Bagel from 'material-ui/svg-icons/image/adjust';
import People from 'material-ui/svg-icons/social/people';

class SideBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    getCartLength() {
        let sum = 0;
        
        if(Object.keys(this.props.cart).length) {
            for(let key in this.props.cart) {
                sum += this.props.cart[key].amt;
            }
        } 

        return sum;
    }

    render() {
        return (
            <div className='side-bar-container'>
                <Drawer open={ this.props.dimensions.width >= 1013 ? true : this.props.sideBarOpen } 
                        docked={ this.props.dimensions.width >= 1013 ? true : false } 
                        onRequestChange={ () => this.props.dimensions.width >= 1013 ? null : this.props.toggleSideBar() }>
                    <Link to='/'>                 
                        <MenuItem className='logo-menu-item text-center' onClick={ () => this.props.toggleSideBar(false) }>
                            <h3> Ya Quddus <br/> Organic Bagelry</h3>
                            <div className='logo-backdrop'></div>
                            <img src='/images/ya_quddus_bagels_logo.jpg' style={{ height: 90, width: '100%' }} />
                        </MenuItem>
                    </Link>

                    <Link to='/'>                 
                        <MenuItem primaryText='Bagels' 
                                  onClick={ () => this.props.toggleSideBar(false) }
                                  leftIcon={ <Bagel /> } />
                    </Link>
                    
                    <Link to='/cart'>                 
                        <MenuItem style={{ paddingTop: 5 }} 
                                  onClick={ () => this.props.toggleSideBar(false) }
                                  primaryText={ 
                                                <span className='inline'>
                                                    Shopping Cart <Badge className='cart-badge' badgeContent={ this.getCartLength() } primary={ true } />
                                                </span> 
                                              } 
                                  leftIcon={ <Cart /> } />
                    </Link>

                    {/*
                    <Link to='/reviews'>                 
                        <MenuItem primaryText='Reviews' 
                                  onClick={ () => this.props.toggleSideBar(false) }
                                  leftIcon={ <Stars /> } />
                    </Link>
                    */ }
                    
                    <Link to='/contact'>                 
                        <MenuItem primaryText='Contact' 
                                  onClick={ () => this.props.toggleSideBar(false) }
                                  leftIcon={ <People /> } />
                    </Link>
                </Drawer>   
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        sideBarOpen: state.sideBar.sideBarOpen,
        dimensions: state.shared.dimensions
    };
}

export default connect(mapStateToProps, { toggleSideBar })(SideBar);