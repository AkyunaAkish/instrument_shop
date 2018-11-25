import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';

import updateContactDetails from '../../../../actions/updateContactDetails';
import updateContactBlur from '../../../../actions/updateContactBlur';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class ContactForm extends PureComponent {
    handleBlur(type) {
        if(!this.props.contactDetailsBlur[type]) {
            this.props.updateContactBlur(type);
        }

        if(!this.props.contactDetails[type] || !this.props.contactDetails[type].trim().length) {
            this.props.updateContactDetails({ [type]: '' });
        }
    }

    handleChange = name => event => {
        this.props.updateContactDetails({ [name]: event.target.value });
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div className='contact-form-container'>
                <Paper elevation={ 1 }>
                    <Grid container spacing={ 8 } justify='center'>
                        <Grid item>
                            <TextField id='input-with-icon-textfield'
                                       className={ `${classes.margin}` }
                                       classes={{ root: 'input-lg' }}
                                       autoFocus={ true }
                                       onBlur={ () => this.handleBlur('firstName') }
                                       label={ 
                                           !!(this.props.contactDetailsErrors.firstName && 
                                              this.props.contactDetailsErrors.firstName.length && 
                                              this.props.contactDetailsBlur.firstName) ? 
                                              this.props.contactDetailsErrors.firstName : 
                                              'First Name' 
                                       }
                                       error={ 
                                           !!(this.props.contactDetailsErrors.firstName && 
                                              this.props.contactDetailsErrors.firstName.length && 
                                              this.props.contactDetailsBlur.firstName) 
                                       }
                                       value={ this.props.contactDetails.firstName || '' }
                                       onChange={ this.handleChange('firstName') }
                                       InputProps={{
                                       startAdornment: (
                                           <InputAdornment position='start'>
                                               <AccountCircle />
                                           </InputAdornment>
                                       ), }} />
                        </Grid>

                        <Grid item>
                            <TextField id='input-with-icon-textfield'
                                       className={ classes.margin }
                                       classes={{ root: 'input-lg' }}
                                       onBlur={ () => this.handleBlur('lastName') }
                                       label={ 
                                           !!(this.props.contactDetailsErrors.lastName && 
                                              this.props.contactDetailsErrors.lastName.length && 
                                              this.props.contactDetailsBlur.lastName) ? 
                                              this.props.contactDetailsErrors.lastName : 
                                              'Last Name' 
                                       }
                                       error={ 
                                           !!(this.props.contactDetailsErrors.lastName && 
                                              this.props.contactDetailsErrors.lastName.length && 
                                              this.props.contactDetailsBlur.lastName) 
                                       }
                                       value={ this.props.contactDetails.lastName || '' }
                                       onChange={ this.handleChange('lastName') }
                                       InputProps={{
                                       startAdornment: (
                                           <InputAdornment position='start'>
                                               <AccountCircle />
                                           </InputAdornment>
                                       ), }} />
                        </Grid>
                    </Grid>
                    
                    <div className='margin-top-lg margin-bottom-lg'></div>

                    <Grid container spacing={ 8 } justify='center'>
                        <Grid item>
                            <TextField id='input-with-icon-textfield'
                                       className={ classes.margin }
                                       classes={{ root: 'input-lg' }}
                                       type='number'
                                       onBlur={ () => this.handleBlur('phoneNumber') }
                                       label={ 
                                           !!(this.props.contactDetailsErrors.phoneNumber && 
                                              this.props.contactDetailsErrors.phoneNumber.length && 
                                              this.props.contactDetailsBlur.phoneNumber) ? 
                                              this.props.contactDetailsErrors.phoneNumber : 
                                              'Phone Number' 
                                       }
                                       error={ 
                                           !!(this.props.contactDetailsErrors.phoneNumber && 
                                              this.props.contactDetailsErrors.phoneNumber.length && 
                                              this.props.contactDetailsBlur.phoneNumber) 
                                       }
                                       value={ this.props.contactDetails.phoneNumber || '' }
                                       onChange={ this.handleChange('phoneNumber') }
                                       InputProps={{
                                       startAdornment: (
                                           <InputAdornment position='start'>
                                               <Phone />
                                           </InputAdornment>
                                       ), }} />
                        </Grid>

                        <Grid item>
                            <TextField id='input-with-icon-textfield'
                                       className={ classes.margin }
                                       classes={{ root: 'input-lg' }}
                                       onBlur={ () => this.handleBlur('email') }
                                       label={ 
                                           !!(this.props.contactDetailsErrors.email && 
                                              this.props.contactDetailsErrors.email.length && 
                                              this.props.contactDetailsBlur.email) ? 
                                              this.props.contactDetailsErrors.email : 
                                              'Email' 
                                       }
                                       error={ 
                                           !!(this.props.contactDetailsErrors.email && 
                                              this.props.contactDetailsErrors.email.length && 
                                              this.props.contactDetailsBlur.email) 
                                       }
                                       value={ this.props.contactDetails.email || '' }
                                       onChange={ this.handleChange('email') }
                                       InputProps={{
                                       startAdornment: (
                                           <InputAdornment position='start'>
                                               <Email />
                                           </InputAdornment>
                                       ), }} />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contactDetails: state.checkout.contactDetails,
        contactDetailsErrors: state.checkout.contactDetailsErrors,
        contactDetailsBlur: state.checkout.contactDetailsBlur,
    };
}

export default connect(mapStateToProps, { updateContactDetails, updateContactBlur })(withStyles(styles)(ContactForm));