import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import ContactForm from './components/ContactForm/ContactForm';
import DeliveryForm from './components/DeliveryForm/DeliveryForm';
import PaymentForm from './components/PaymentForm/PaymentForm';
import FinalReview from './components/FinalReview/FinalReview';

const styles = theme => ({
    root: {
      width: '90%',
    },
    button: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return [ 
        'Provide Contact Details', 
        'Provide Delivery Details', 
        'Provide Payment Details'
    ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
        return <DeliveryForm />;
    case 2:
        return <PaymentForm />;
  }
}

class CheckoutStepper extends PureComponent {
    state = {
        activeStep: 0,
        skipped: new Set(),
    }

    isStepOptional = step => {
        return false;
        // return step === 1;
    }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    }

    handleSkip = () => {
        const { activeStep } = this.state;

        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error(`You can't skip a step that isn't optional.`);
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());

            skipped.add(activeStep);

            return {
            activeStep: state.activeStep + 1,
            skipped,
            };
        });
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    nextButtonDisabled() {
        let disable = false;

        if(this.state.activeStep === 0 && !this.props.contactDetailsValid) {
            disable = true;
        } else if(this.state.activeStep === 1 && !this.props.deliveryDetailsValid) {
            disable = true;
        } else if(this.state.activeStep === 2 && !this.props.paymentDetailsValid) {
            disable = true;
        }

        return disable;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={ `${classes.root} checkout-container` }>
                <div className='margin-bottom-lg'>
                    <Button variant='contained' 
                            classes={{ root: 'dark-btn dark-btn-md' }}
                            onClick={ () => this.props.history.push('/cart') }>
                        Back
                    </Button>
                </div>

                <h1>Checkout</h1>

                <Paper>
                    <Stepper activeStep={ activeStep } classes={{ root: 'stepper' }}>
                        { steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            
                            if (this.isStepOptional(index)) {
                                labelProps.optional = <Typography variant='caption'>Optional</Typography>;
                            }

                            if (this.isStepSkipped(index)) {
                                props.completed = false;
                            }
                            
                            let stepClass = activeStep == index ? 'active-step' : 'inactive-step';

                            return (
                                <Step key={ label } 
                                    { ...props } 
                                    classes={{ root: stepClass, completed: 'completed-step' }}>
                                    <StepLabel { ...labelProps }>{ label }</StepLabel>
                                </Step>
                            );
                        }) }
                    </Stepper>
                </Paper>

                <div>
                    { activeStep === steps.length ? (
                        <div>
                            <FinalReview />

                            <Button onClick={ this.handleReset } 
                                    variant='outlined'
                                    className={ classes.button }>
                                Reset
                            </Button>
                        </div>
                        ) : (
                        <div>
                            { getStepContent(activeStep) }

                            <div>
                                <Button disabled={ activeStep === 0 }
                                        onClick={ this.handleBack }
                                        variant='outlined'
                                        className={ classes.button }>
                                    Back
                                </Button>

                                { this.isStepOptional(activeStep) && false && (
                                    <Button variant='contained'
                                            color='primary'
                                            onClick={ this.handleSkip }
                                            className={ classes.button }>
                                        Skip
                                    </Button>
                                ) }

                                <Button variant='contained'
                                        color='primary'
                                        classes={{ root: 'dark-btn', disabled: 'disabled-btn' }}
                                        onClick={ this.handleNext }
                                        disabled={ this.nextButtonDisabled() }
                                        className={ classes.button }>
                                    { activeStep === steps.length - 1 ? 'Finish' : 'Next' }
                                </Button>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        );
    }
}

CheckoutStepper.propTypes = {
  classes: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        contactDetailsValid: state.checkout.contactDetailsValid,
        deliveryDetailsValid: state.checkout.deliveryDetailsValid,
        paymentDetailsValid: state.checkout.paymentDetailsValid,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(CheckoutStepper));