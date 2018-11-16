import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        // console.log('this.props.cart', this.props.cart);
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
      
    priceRow(qty, unit) {
        return qty * unit;
    }
      
    createRow(id, desc, qty, unit) {
        const price = this.priceRow(qty, unit);
        return { id, desc, qty, unit, price };
    }
      
    subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
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
                    </TableRow>
                </TableHead>

                <TableBody>
                    { this.state.rows.map(row => {
                        return (
                            <TableRow key={ row.id }>
                                <TableCell>{ row.desc }</TableCell>
                                <TableCell numeric>{ row.qty }</TableCell>
                                <TableCell numeric>{ row.unit }</TableCell>
                                <TableCell numeric>{ this.ccyFormat(row.price) }</TableCell>
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

export default withStyles(styles)(CartTable);