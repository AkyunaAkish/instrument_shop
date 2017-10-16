import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import SideBar from './components/SideBar/SideBar';

const Home = asyncComponent({
    resolve: () => import('./components/Home/Home')
});

class Router extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <SideBar />
                    
                    <div className='main-stage-container'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Redirect from='*' to='/' />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};

export default Router;