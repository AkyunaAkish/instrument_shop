import React, { PureComponent } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Thumbnail, Button } from 'react-bootstrap';

class BagelGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='bagel-grid-container'>
                <Thumbnail className='bagel-grid-item' src="/images/ya_quddus_bagels_logo.jpg">
                    <h3>Bagel Name</h3>
                    <p>
                        <RaisedButton
                            label='Add to Cart'
                            style={{ marginRight: 10 }}
                        />
                        <RaisedButton
                            label='View Info'
                        />
                    </p>
                </Thumbnail>
            </div>
        );
    }
}

export default BagelGrid;