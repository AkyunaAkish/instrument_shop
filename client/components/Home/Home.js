import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            button: {
                margin: 12,
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };

        return (
            <div className='home-container'>
                <div className='home-img-container'>
                    <div className='home-img-backdrop'></div>
                    <div className='home-img-text text-center'> 
                        <h2>
                                Handmade, Boiled, New York Style Bagels
                            <br />
                                Made Fresh on Kauai, HI
                        </h2>
                        <RaisedButton
                            href="https://github.com/callemall/material-ui"
                            target="_blank"
                            label="Like us on Facebook"
                            secondary={true}
                            style={styles.button}
                            icon={<FontIcon className="muidocs-icon-custom-github" />}
                        />
                        <RaisedButton
                            href="https://github.com/callemall/material-ui"
                            target="_blank"
                            label="Follow us on Instagram"
                            secondary={true}
                            style={styles.button}
                            icon={<FontIcon className="muidocs-icon-custom-github" />}
                        />
                    </div>
                    
                    <img className='home-img' src='/images/food-sunset-love-field-shorter.jpg' />
                </div>
            </div>
        );
    }
}

export default Home;