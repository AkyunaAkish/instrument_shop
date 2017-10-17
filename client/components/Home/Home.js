import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

import BagelGrid from '../BagelGrid/BagelGrid';

class Home extends PureComponent {
    constructor(props) {
        super(props);
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
                            href='https://www.facebook.com/Ya-Quddus-Bagel-1242342042461855'
                            target='_blank'
                            label='Like us on Facebook'
                            labelColor='rgb(255, 255, 255)'
                            backgroundColor='rgb(59,89,152)'
                            style={{ margin: 12 }}
                            rippleStyle={{ backgroundColor: 'rgba(255, 255, 255, .5)' }}
                            icon={
                                    <i style={{ fontSize: 17, color: 'rgb(255,255,255)' }} 
                                       className='fa fa-facebook-square'></i>
                                 }
                        />
                        <RaisedButton
                            href='https://www.instagram.com/yaquddusbagel/'
                            target='_blank'
                            label='Follow us on Instagram'
                            labelColor='rgb(255, 255, 255)'
                            backgroundColor=' #e95950'
                            style={{ margin: 12 }}
                            rippleStyle={{ backgroundColor: 'rgba(255, 255, 255, .5)' }}
                            icon={
                                <i style={{ fontSize: 17, color: 'rgb(255,255,255)' }}
                                    className='fa fa-instagram'></i>
                                
                            }
                        />                 
                    </div>
                    
                    <img className='home-img' src='/images/food-sunset-love-field-shorter.jpg' />
                </div>

                <BagelGrid />
            </div>
        );
    }
}

export default Home;