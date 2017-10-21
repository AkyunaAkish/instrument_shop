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
                <Thumbnail key={ ind } className='bagel-grid-item text-left shadow' src={ bagel.img }>
                    <h3>{ bagel.type }</h3>
                    <div>
                        <RaisedButton
                            label='Add to Cart'
                            backgroundColor='rgb(70,62,63)'
                            style={{ marginRight: 10 }}
                        />
                        <RaisedButton
                            label='View Info'
                            backgroundColor='rgb(70,62,63)'
                        />
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

export default BagelGrid;