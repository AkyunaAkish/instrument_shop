import React, { PureComponent } from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Stars from 'material-ui/svg-icons/action/stars';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Bagel from 'material-ui/svg-icons/image/adjust';
import People from 'material-ui/svg-icons/social/people';

class TopBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='top-bar-container'>
                <AppBar style={{ backgroundColor: 'rgb(70,62,63)' }}
                        title='Ya Quddus Bagel' />                    
            </div>
        );
    }
}

export default TopBar;