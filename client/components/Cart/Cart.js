import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
    }

    findBagelCount(bagel) {
        return this.props.cart.reduce((count, currentBagel) => {
            if(currentBagel.type === bagel.type) {
                count += 1;
            }

            return count;
        }, 0);
    }

    hasBagelAlready(arr, bagel) {
        return arr.reduce((bool, currentBagel) => {
            if(currentBagel.type === bagel.type) {
                bool = true;
            }

            return bool;
        }, false);
    }

    renderCartList() {
        const typesInCart = [];

        return this.props.cart.reduce((finalArr, bagel, ind) => {
            if (!this.hasBagelAlready(typesInCart, bagel)) {
                    typesInCart.push(bagel);

                    finalArr.push(
                        <div key={ ind }>
                                { ind != 0 ? <Divider /> : <span></span> }

                                <ListItem style={{ color: 'rgb(70,62,63)' }}
                                          leftAvatar={ <span>{bagel.type}</span> }
                                          rightIcon={ <ActionInfo className='inline-block' /> }
                                          primaryText={ this.findBagelCount(bagel) } />
                        </div>
             
                );
            }

            return finalArr;
        }, []);
    }
    render() {
        const style = {
            width: '97%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 20,
            backgroundColor: 'rgb(253,244,220)',
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <div className='cart-container'>
                <Paper className='cart-paper' style={ style } zDepth={ 1 }>
                    <List>
                        { this.renderCartList() }
                    </List>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

export default connect(mapStateToProps)(Cart);