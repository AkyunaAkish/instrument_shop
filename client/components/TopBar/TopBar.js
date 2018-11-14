import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toggleSideBar from '../../actions/toggleSideBar';

import AppBar from 'material-ui/AppBar';

class TopBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            drawerOpen: false 
        };
    }

    render() {
        return (
            <div className='top-bar-container'>
                <AppBar style={{ backgroundColor: 'rgb(70,62,63)' }}
                        title='Ya Quddus Bagel'
                        onLeftIconButtonTouchTap={ () => this.props.toggleSideBar() } />
            </div>
        );
    }
}

export default connect(null, { toggleSideBar })(TopBar);