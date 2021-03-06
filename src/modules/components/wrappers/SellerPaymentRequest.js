import React from 'react';
import { ClipLoader } from 'react-spinners';
import globalVariables from '../../../global-variables';

import { Typography, withStyles, Grid, Button, Snackbar } from '@material-ui/core';
import 'typeface-roboto';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import PaymentForm from '../parts/PaymentForm';
import PaymentCard from '../parts/MiniTablePayment';
import ButtonCard from '../parts/TextButtonCard';
import './styles/componentAddDelete.css';
import { paymentAPI } from '../../../api/api';
import cancelablePromise from '../../../Providers/CancelablePromise';

import MySnackbar from '../parts/MySnackbar';

import styles from '../../../assets/jss/components/wrappers/CheckoutAddress';

class CheckoutAddress extends React.Component {
    state = {
        addForm: false,
        selectedPayment: 0,
        payments: [],
        isLoading: true,
        editIdx: null,
        isPopup: false,
        messageType: globalVariables.TYPE_INFO,
        message: '',
    }

    pendingPromises = [];

    componentWillUnmount = () => this.pendingPromises.map(p => p.cancel());

    appendPendingPromise = promise => this.pendingPromises = [...this.pendingPromises, promise];

    removePendingPromise = promise => this.pendingPromises = this.pendingPromises.filter(p => p !== promise);

    componentDidMount() {
        const wrappedPromise = cancelablePromise(paymentAPI.get('/'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => { 
                res.data.account = res.data.map(payment => {
                    payment.account = JSON.parse(payment.account)
                    return payment
                })
                this.setState({ payments: res.data, isLoading: false }) 
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            });
    }

    addressClickHandler = idx => this.setState({ selectedPayment: idx });

    addAddressDialogToggle = () => {
        const dialog = this.state.addForm;
        this.setState({
            addForm: !dialog,
            editIdx: null,
        });
    }

    formActionHandler = obj => {
        this.addAddressDialogToggle();
        const { payments } = this.state;
        payments.push(obj)
        this.setState({
            payments: payments,
        });
    }
    formEditAction = (id, data) => {
        this.addAddressDialogToggle();
        let payments = [...this.state.payments];
        const idx = payments.findIndex(item => item.id === id);
        payments[idx] = data;
        this.setState({ payments: payments })

    }
    handleDetailsButton = (id) => {
        this.setState({
            isPopup: true,
            messageType: globalVariables.TYPE_INFO,
            message: 'not working in this version'
        })
    }
    handleDelete = (id,token) => {
        let payments = [...this.state.payments]
        const wrappedPromise = cancelablePromise(paymentAPI.delete(`${id}/${token}`));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise
            .promise
            .then(res => {
                const idx = payments.findIndex(item => item.id === id)
                payments.splice(idx, 1)
                this.setState({ payments: payments })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(res => {
            });
    }

    handlePopupClose = () => 
        this.setState({isPopup:false})

    render() {
        const { classes } = this.props;
        const { payments, isLoading } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography gutterBottom component='h2' variant='h5'>{globalVariables.FORM_REGISTER_LABEL_TITLE[globalVariables.LANG]}</Typography>
                </Grid>
                
                <Snackbar
                    style={{bottom:'50px'}}   
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.isPopup}
                    autoHideDuration={6000}
                    onClose={this.handlePopupClose}
                >
                    <MySnackbar 
                        className={classes.margin}
                        onClose={this.handlePopupClose}
                        variant={this.state.messageType}
                        message={this.state.message}
                        
                    />
                </Snackbar>

                {isLoading ?
                    <Grid container alignItems="center" justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                    </Grid> : null
                }
                {isLoading ? null :
                    <Grid item xs={12} >
                        <Grid container justify="center" className={classes.root}>
                            <TransitionGroup
                                component={Grid}
                                item
                                xs={12}
                                className={classes.addressCardsRoot}
                                container
                            >
                                {payments.map((obj, index) =>
                                    <CSSTransition
                                        key={index}
                                        timeout={500}
                                        classNames="componentAddDelete"
                                    >

                                        <PaymentCard
                                            id={obj.id}
                                            token={obj._token}
                                            key={index}
                                            method={obj.method}
                                            account={obj.account}
                                            selected={this.state.selectedPayment === index ? true : false}
                                            onClick={this.addressClickHandler.bind(this, index)}
                                            handleDelete={this.handleDelete}
                                            handleDetailsButton={this.handleDetailsButton}
                                        />
                                    </CSSTransition>
                                )}

                                <ButtonCard onClick={this.addAddressDialogToggle} text={"+ " + globalVariables.SELLER_ADD_NEW_ACCOUNT[globalVariables.LANG]} />
                            </TransitionGroup>

                            <PaymentForm
                                open={this.state.addForm}
                                title={globalVariables.CHECKOUT_ADD_NEW_ADDRESS[globalVariables.LANG]}
                                onClose={this.addAddressDialogToggle.bind(this)}
                                formAction={this.formActionHandler.bind(this)}
                                formEditAction={this.formEditAction}
                                edit={Boolean(this.state.editIdx) || this.state.editIdx === 0}
                                intialData={this.state.payments[this.state.editIdx]}
                            />


                            <Button color='primary' variant='contained' style={{ margin: '10px' }} onClick={()=>this.props.handleConfirmPayment(this.state.payments[this.state.selectedPayment])}>
                                {globalVariables.SELLER_PAYMENT_REQUEST[globalVariables.LANG]}
                            </Button>
                          
                        </Grid>

                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CheckoutAddress);