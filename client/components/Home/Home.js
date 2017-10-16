import React, { PureComponent } from 'react';

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='home-container'>
                <div className='home-img-container'>
                    <div className='home-img-backdrop'></div>
                    <h2> 
                        Handmade, Boiled, New York Style Bagels 
                        <br/>
                        Made Fresh on Kauai, HI
                    </h2>
                    <img className='home-img' src='/images/food-sunset-love-field-shorter.jpg' />
                </div>
            </div>
        );
    }
}

export default Home;