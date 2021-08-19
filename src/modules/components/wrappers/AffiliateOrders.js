import React from 'react';
import { ClipLoader } from 'react-spinners';

import { withStyles, Grid, Typography, Snackbar, } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'typeface-roboto';

import CustomMaterialTable from '../parts/CustomMaterialTable';
import cancelablePromise from '../../../Providers/CancelablePromise';

import styles from '../../../assets/jss/components/wrappers/SellingOrders';
import { affiliateAPI } from '../../../api/api';
// import { Link } from 'react-router-dom'
import MySnackbar from '../parts/MySnackbar';
import globalVariables from '../../../global-variables';
import SelectMenu from '../parts/SelectMenu';

const orderStatusData = globalVariables.LANG === 'ar' ?
    [
        { value: 'all', label: 'الكل' },
        { value: 'active', label: 'نشط' },
        { value: 'shipped', label: 'في الشحن' },
        { value: 'delivered', label: 'تم التوصيل' },
        { value: 'canceled', label: 'الغي' },
        { value: 'returned', label: 'استرجع' },
    ]
    :
    [
        { value: 'all', label: 'all' },
        { value: 'active', label: 'active' },
        { value: 'shipped', label: 'shipped' },
        { value: 'delivered', label: 'delivered' },
        { value: 'canceled', label: 'canceled' },
        { value: 'returned', label: 'returned' },
    ];

const columns = [
    { title: 'Order ID', field: 'id', type: "numeric" },
    { title: 'Order Status', field: 'status' },
    { title: 'Expected Earning', field: 'max_earning', type: "numeric" },
    { title: 'Plan Commission', field: 'level_commission', type: "numeric" },
    { title: 'Buyer Name', field: 'address.full_name' },
    { title: 'Date', field: 'created_at' },
];
const columns2 = [
    { title: 'Order ID', field: 'order.id', type: "numeric" },
    { title: 'Commission', field: 'commission', type: "numeric" },
    { title: 'Buyer Name', field: 'order.address.full_name' },
    { title: 'Date', field: 'created_at' },
];


class AffiliateOrders extends React.Component {
    state = {
        isLoading: true,

        allProducts: [],

        isPopup: false,
        serverMessage: '',
        messageType: 'success',

        orderStatus: 'all',
    }

    pendingPromises = [];
    componentWillUnmount = () =>
        this.pendingPromises.map(p => p.cancel());
    appendPendingPromise = promise =>
        this.pendingPromises = [...this.pendingPromises, promise];
    removePendingPromise = promise =>
        this.pendingPromises = this.pendingPromises.filter(p => p !== promise);




    
    getAffiliateOrders = () => {
        const wrappedPromise = cancelablePromise(affiliateAPI('/order'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                res.data.affiliateOrders.map(item => {
                    item.max_earning =  item.products.reduce((acc, prod)=> acc + prod.total_commission, 0) * res.data.plan.commission * 2.5 /100;
                    item.level_commission = res.data.plan.commission * 2.5 + '%';
                })
                this.setState({ allProducts: res.data.affiliateOrders, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }

    getAffiliateOrdersTransactions = () => {
        const wrappedPromise = cancelablePromise(affiliateAPI('/order/transactions'));
        this.appendPendingPromise(wrappedPromise);

        wrappedPromise.promise
            .then(res => {
                // res.data.map(item => {
                //     item.max_earning =  item.products.reduce((acc, prod)=> acc + prod.total_commission, 0);
                // })
                // this.setState({ allProducts: res.data, isLoading: false })
                this.setState({ transactions: res.data, isLoading: false })
            })
            .then(() => this.removePendingPromise(wrappedPromise))
            .catch(err => {
                if (!err.isCanceled) {
                    this.setState({ isLoading: false })
                }
            })
    }

    componentDidMount() {
        this.getAffiliateOrders();
        this.getAffiliateOrdersTransactions();
    }
    handleFilterChange = prop => event =>
        this.setState({ [prop]: event.target.value });

    render() {

        const { classes } = this.props;
        const { isLoading, isPopup, messageType, serverMessage } = this.state;
        let lng = globalVariables.LANG;
        const notPendingProds = 
            this.state.allProducts.filter(prod => this.state.orderStatus === 'all' || prod.status === this.state.orderStatus)
        return (
            <Grid container item justify='center' xs={11}>

                <Snackbar
                    style={{ bottom: '50px' }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isPopup}
                    autoHideDuration={6000}
                    onClose={this.handlePopupClose}
                >
                    <MySnackbar
                        className={classes.margin}
                        onClose={this.handlePopupClose}
                        variant={messageType}
                        message={serverMessage}

                    />
                </Snackbar>


                <Grid item xs={12}>
                    <Typography gutterBottom component='h1' variant='h4' className={classes.textHead}>اوردرات </Typography>
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    {isLoading ?
                        <Grid container alignItems="center" justify="center" >
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                color={'#123abc'}
                                loading={isLoading}
                            />
                        </Grid> : <React.Fragment>

                           
                            <div className={classes.optionMenusSection}>
                                <SelectMenu
                                    name="sort"
                                    onChange={this.handleFilterChange('orderStatus')}
                                    value={this.state.orderStatus}
                                    values={orderStatusData}
                                    sideLabel={"حالة الاوردر"}
                                    version={2}
                                />
                            </div>
                            
                            <CustomMaterialTable
                                data={notPendingProds}
                                columns={columns} 
                                title={globalVariables.LABEL_SELLING_ORDERS_NOT_PENDING[lng]}
                            />
                            <CustomMaterialTable
                                data={this.state.transactions}
                                columns={columns2} 
                                title={globalVariables.LABEL_AFFILIATE_ORDERS_TRANSACTIONS[lng]}
                            />

                        </React.Fragment>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AffiliateOrders);
