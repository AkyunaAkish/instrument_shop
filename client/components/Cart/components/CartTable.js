import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import updateBagelAmount from '../../../actions/updateBagelAmount';
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
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class CartTable extends PureComponent {
    state = {
        rows: [],
        invoiceSubtotal: 0,
        invoiceTaxes: 0,
        invoiceTotal: 0,
        taxRate: 0,
        dialogOpen: false,
        dialogItem: {},
        dialogQuantity: null
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

    handleEdit(row) {
        this.setState({ 
            dialogOpen: true,
            dialogItem: row,
            dialogQuantity: row.amt 
        });
    }

    renderEdit(row) {
        return (
            <IconButton aria-label='Edit Quantity'
                        onClick={ () => this.handleEdit(row) }>
                <EditIcon />
            </IconButton>
        );
    }

    handleDelete(row) {
        // remove all of same type
        this.props.removeFromCart(row, row.amt);

        // check if cart is empty and
        // redirect if cart has become empty
        this.props.handleEmptyCart();
    }

    handleChange = name => event => {
        this.setState({
          [name]: +event.target.value || '',
        });
    }

    handleUpdate() {
        this.props.updateBagelAmount(this.state.dialogItem, this.state.dialogQuantity);
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={ classes.root } classes={{ root: 'cart-paper always-show-scollbar' }}>
                <Table className={ classes.table }>

                <TableHead classes={{ root: 'table-section-left-aligned' }}>
                    <TableRow>
                        <TableCell>Bagel</TableCell>
                        <TableCell numeric>Qty.</TableCell>
                        <TableCell numeric>@</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody classes={{ root: 'table-section-left-aligned' }}>
                    { this.state.rows.map(row => {
                        return (
                            <TableRow key={ row.id }>
                                <TableCell>{ row.type }</TableCell>
                                <TableCell numeric classes={{ root: 'table-min-width-rows' }}>
                                    { row.amt } { this.renderEdit(row) }
                                </TableCell>
                                <TableCell numeric>${ row.unit }</TableCell>
                                <TableCell numeric>${ this.ccyFormat(row.price) }</TableCell>
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
                        <TableCell rowSpan={ 3 } />
                        <TableCell colSpan={ 2 }>Subtotal</TableCell>
                        <TableCell numeric>${ this.ccyFormat(this.state.invoiceSubtotal) }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell numeric>{ `${(this.state.taxRate * 100).toFixed(0)} %` }</TableCell>
                        <TableCell numeric>${ this.ccyFormat(this.state.invoiceTaxes) }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={ 2 }>Total</TableCell>
                        <TableCell numeric>${ this.ccyFormat(this.state.invoiceTotal) }</TableCell>
                    </TableRow>
                </TableBody>
                </Table>

                <Dialog open={ this.state.dialogOpen }
                        classes={{ root: 'large-text-dialog' }}
                        onClose={ () => this.setState({ dialogOpen: false }) }
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>
                        { `Update ${this.state.dialogItem.type} Quantity` }
                    </DialogTitle>

                    <DialogContent>
                        <TextField label='Number'
                                   value={ this.state.dialogQuantity }
                                   onChange={ this.handleChange('dialogQuantity') }
                                   type='number'
                                   className={ classes.textField }
                                   margin='normal'
                                   variant='filled' />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ () => this.handleUpdate() } 
                                color='primary'
                                disabled={ this.state.dialogQuantity == this.state.dialogItem.amt || !Number(this.state.dialogQuantity) }>
                            Update
                        </Button>
                        <Button onClick={ () => this.setState({ dialogOpen: false }) } color='primary' autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

export default withStyles(styles)(connect(null, { updateBagelAmount, removeFromCart })(withStyles(styles)(withRouter(CartTable))));