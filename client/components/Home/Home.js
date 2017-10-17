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
                                    <i style={{ fontSize: 20, color: 'rgb(255,255,255)' }} 
                                       className='fa fa-facebook-square'></i>
                                 }
                        />
                        <RaisedButton
                            href='https://www.instagram.com/yaquddusbagel/'
                            target='_blank'
                            label='Follow us on Instagram'
                            labelColor='rgb(255, 255, 255)'
                            backgroundColor='rgb(139,157,195)'
                            style={{ margin: 12 }}
                            rippleStyle={{ backgroundColor: 'rgba(255, 255, 255, .5)' }}
                            icon={
                                <i style={{ fontSize: 20, color: 'rgb(255,255,255)' }}
                                    className='fa fa-instagram'></i>
                            }
                        />                 
                    </div>
                    
                    <img className='home-img' src='/images/food-sunset-love-field-shorter.jpg' />
                </div>
            </div>
        );
    }
}

export default Home;