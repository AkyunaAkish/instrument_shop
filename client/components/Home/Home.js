import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

import BagelGrid from '../BagelGrid/BagelGrid';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            bagels: [
                {
                    type: 'Whole Wheat',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                },
                {
                    type: 'Marble Rye',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                },
                {
                    type: 'Sesame',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                },
                {
                    type: 'Pumpernickel',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                },
                {
                    type: '7 Seed',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                },
                {
                    type: 'Jalapeno',
                    img: '/images/ya_quddus_bagels_logo.jpg'
                }
            ]
        };
    }

    render() {
        return (
            <div className='home-container'>
                <div className='home-img-container'>
                    <div className='home-img-backdrop'></div>
                    <div className='home-img-text text-center'> 
                        <h1>Ya Quddus Bagel</h1>
                        <h2>
                                Handmade, Boiled, New York Style Bagels
                            <br />
                                Made Fresh on Kauai, HI
                        </h2>
                        <RaisedButton
                            className='social-btn'
                            href='https://www.facebook.com/Ya-Quddus-Bagel-1242342042461855'
                            target='_blank'
                            label='Like us on Facebook'
                            labelColor='rgb(255, 255, 255)'
                            backgroundColor='rgb(59,89,152)'
                            style={{ margin: 12 }}
                            rippleStyle={{ backgroundColor: 'rga(233,218,196, .5)' }}
                            icon={
                                    <i style={{ fontSize: 17, color: 'rgb(233,218,196)' }} 
                                       className='fa fa-facebook-square'></i>
                                 }
                        />
                        <RaisedButton
                            className='social-btn'
                            href='https://www.instagram.com/yaquddusbagel/'
                            target='_blank'
                            label='Follow us on Instagram'
                            labelColor='rgb(255, 255, 255)'
                            backgroundColor=' #e95950'
                            style={{ margin: 12 }}
                            rippleStyle={{ backgroundColor: 'rga(233,218,196, .5)' }}
                            icon={
                                <i style={{ fontSize: 17, color: 'rgb(233,218,196)' }}
                                    className='fa fa-instagram'></i>
                                
                            }
                        />                 
                    </div>
                    
                    <img className='home-img' src='/images/wheat_background.jpg' />
                </div>

                <BagelGrid bagels={ this.state.bagels } />
            </div>
        );
    }
}

export default Home;