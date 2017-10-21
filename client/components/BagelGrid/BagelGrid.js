import React, { PureComponent } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Thumbnail, Button } from 'react-bootstrap';

class BagelGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderBagels() {
        return this.props.bagels.map((bagel, ind) => {
            return (
                <Thumbnail key={ ind } className='bagel-grid-item text-left' src={ bagel.img }>
                    <h3>{ bagel.type }</h3>
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
            );
        });
    }

    render() {
        return (
            <div className='bagel-grid-container text-center'>
                { this.renderBagels() }
            </div>
        );
    }
}

export default BagelGrid;