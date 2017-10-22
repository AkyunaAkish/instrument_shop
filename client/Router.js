import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';

const Home = asyncComponent({
    resolve: () => import('./components/Home/Home')
});

const Cart = asyncComponent({
    resolve: () => import('./components/Cart/Cart')
});

const Reviews = asyncComponent({
    resolve: () => import('./components/Reviews/Reviews')
});

const Contact = asyncComponent({
    resolve: () => import('./components/Contact/Contact')
});

class Router extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <TopBar />
                    <SideBar />
                    
                    <div className='main-stage-container'>
                        <Switch>
                            <Route exact path='/' component={ Home } />
                            <Route exact path='/cart' component={ Cart } />
                            <Route exact path='/reviews' component={ Reviews } />
                            <Route exact path='/contact' component={ Contact } />
                            <Redirect from='*' to='/' />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};

export default Router;