import React, { PureComponent } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Stars from 'material-ui/svg-icons/action/stars';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Bagel from 'material-ui/svg-icons/image/adjust';

class SideBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='side-bar-container'>
                <Drawer open={ true }>
                    <MenuItem className='logo-menu-item text-center' >
                        <h3> Ya Quddus <br/> Organic Bagelry</h3>
                        <div className='logo-backdrop'></div>
                        <img src='/images/ya_quddus_bagels_logo.jpg' style={{ height: 65, width: '100%' }} />
                    </MenuItem>

                    <MenuItem primaryText='Bagels' leftIcon={<Bagel /> } />
                    <MenuItem primaryText='Shopping Cart' leftIcon={<Cart /> } />
                    <MenuItem primaryText='Reviews' leftIcon={<Stars /> } />
                </Drawer>   
            </div>
        );
    }
}

export default SideBar;