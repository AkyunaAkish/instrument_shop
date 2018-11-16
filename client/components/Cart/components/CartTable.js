import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import removeFromCart from '../../../actions/removeFromCart';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
});

class CartTable extends PureComponent {
    state = {
        rows: [],
        invoiceSubtotal: 0,
        invoiceTaxes: 0,
        invoiceTotal: 0,
        taxRate: 0
    }

    componentDidMount() {
        this.updateCartTable();
    }

    componentWillReceiveProps() {
        this.updateCartTable();
    }

    updateCartTable() {
        let cart = this.props.cart;
        let rows = [];
        
        if(Object.keys(cart).length) {
            for(let key in cart) {
                if(cart[key].amt) {
                    rows.push([
                        key,
                        cart[key].amt,
                        cart[key].price
                    ]);
                }
            }
        }
        
        rows = rows.map((row, id) => this.createRow(id, ...row));
 
        const taxRate = 0.04;
        const invoiceSubtotal = this.subtotal(rows);
        const invoiceTaxes = taxRate * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;

        this.setState({
            rows,
            taxRate,
            invoiceSubtotal,
            invoiceTaxes,
            invoiceTotal
        });
    }

    ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }
      
    priceRow(amt, unit) {
        return amt * unit;
    }
      
    createRow(id, type, amt, unit) {
        const price = this.priceRow(amt, unit);
        return { id, type, amt, unit, price };
    }
      
    subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    handleDelete(row) {
        this.props.removeFromCart(row, row.amt);
        console.log('this.props.cart', this.props.cart);
        this.props.handleEmptyCart();
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={ classes.root } classes={{ root: 'cart-paper' }}>
                <Table className={ classes.table }>

                <TableHead>
                    <TableRow>
                        <TableCell>Bagel</TableCell>
                        <TableCell numeric>Qty.</TableCell>
                        <TableCell numeric>@</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { this.state.rows.map(row => {
                        console.log('row', row);
                        return (
                            <TableRow key={ row.id }>
                                <TableCell>{ row.type }</TableCell>
                                <TableCell numeric>{ row.amt }</TableCell>
                                <TableCell numeric>{ row.unit }</TableCell>
                                <TableCell numeric>{ this.ccyFormat(row.price) }</TableCell>
                                <TableCell numeric>
                                    <IconButton aria-label='Delete'
                                                onClick={ () => this.handleDelete(row) }>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    }) }

                    <TableRow>
                        <TableCell rowSpan={ 3 } />
                        <TableCell colSpan={ 2 }>Subtotal</TableCell>
                        <TableCell numeric>{ this.ccyFormat(this.state.invoiceSubtotal) }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell numeric>{ `${(this.state.taxRate * 100).toFixed(0)} %` }</TableCell>
                        <TableCell numeric>{ this.ccyFormat(this.state.invoiceTaxes) }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={ 2 }>Total</TableCell>
                        <TableCell numeric>{ this.ccyFormat(this.state.invoiceTotal) }</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default connect(null, { removeFromCart })(withStyles(styles)(withRouter(CartTable)));