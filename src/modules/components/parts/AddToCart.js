import React from 'react';
import { withRouter } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';

import globalVariables from '../../../global-variables';
import { withStyles, Grid, Typography, Divider, TextField, Button } from '@material-ui/core';
import 'typeface-roboto';

import { governorateAPI,  } from '../../../api/api';

import styles from '../../../assets/jss/components/parts/AddToCart';

const supportSection = [
    {
        title: {en: 'BEST PRODUCTS', ar: 'أفضل المنتجات'},
        desc: {
            en: 'We only invest in high quality products and bring them to you at best prices',
            ar: 'نحن نستثمر فقط في المنتجات عالية الجودة ونوفرهم لكم بأفضل الأسعار'
        },
        icon: 'gem',
    },
    {
        title: {en: 'FAST DELIVERY', ar: 'شحن سريع'},
        desc: {
            en: 'Our delivery system is a professional service that you can trust',
            ar: 'خدمة الشحن لدينا خدمة مميزة احترافية يمكنك الوثوق بها'
        },
        icon: 'shipping-fast',
    },
    {
        title: {en: 'SECURED ORDERS', ar: 'طلبات آمنة'},
        desc: {
            en: 'Your data and orders privacy are always protected',
            ar: 'المعلومات والطلبات الخاصة بك محمية بشكلٍ دائم'
        },
        icon: 'user-shield',
    },
    {
        title: {en: 'EASY REPLACEMENTS', ar: 'استبدال سهل'},
        desc: {
            en: 'Never worry about your online shopping experience with us, we help you return and replace applicable products',
            ar: 'لا تقلق على تجربة الشراء اونلاين معنا، نحن نوفر لك استرجاع واستبدال سهل للمنتجات الخاضعة لذلك'
        },
        icon: 'sync-alt',
    }
]

class AddToCart extends React.Component{
    state = {
        governorate: -1,
        governorates: [],
        quantity: 1,
        shipping: {},
        isLoading: true,
    }
    
    componentDidMount(){
        governorateAPI.get('')
        .then(res=>{
            const governorates = res.data.map(item => ({id: item.id, name: globalVariables.LANG==='ar'? item.governorate_name:item.governorate_name_en}));
            this.setState({
                governorates: governorates,
                governorate: governorates[0].id,
            })
            this.getShippingPrice(governorates[0].id)
        })
        .catch(res=>{
            this.setState({isLoading:false})
        })

        
    }

    getShippingPrice = (id) =>{
        governorateAPI.post(`${id}/shipping`, {tebx: this.props.tebx})
        .then(res=>{
            this.setState({
                shipping: res.data,
                isLoading: false,
            })
        })
        .catch(res=>{
            this.setState({
                shipping: {
                    message: globalVariables.PRODUCT_SHIPPING_STATUS[globalVariables.LANG]
                },
                isLoading: false,
            })
        })
    }

    handleGovernorateChange = event => {
        // console.log(event.target.value)
        this.setState({ 
            governorate: event.target.value, 
            isLoading:true 
        });
        this.getShippingPrice(event.target.value)
    };

    render(){
        const { classes, quantity } = this.props;
        const { isLoading } = this.state;
        const QUANTITIES = [...Array(quantity)].map((item, idx) => idx + 1);
        
        // console.log(this.state.governorate)

        return(
            <React.Fragment>
            {isLoading?
            <Grid container justify="center" alignItems="center" style={{height:'250px'}} className={classes.orderContainer}>
                <Grid container justify="center" >
                        <ClipLoader
                            sizeUnit={"px"}
                            size={75}
                            color={'#123abc'}
                            loading={isLoading}
                        />
                </Grid>
            </Grid>
            :
            <div
                className={classes.orderContainer}
                style={{borderCollapse: 'separate', borderSpacing: '4px'}}
                id={this.props.scrollId}
                >

                <Typography className={classes.orderHeader} variant="h6">
                {globalVariables.LABEL_PRODUCT_ORDER[globalVariables.LANG]}
                </Typography>
                
                <Divider className={classes.divider} variant="middle" />
                
            {quantity? <React.Fragment>
                <div className={classes.section}>
                    <div>
                    <Typography variant="caption" > {globalVariables.LABEL_QUANTITY[globalVariables.LANG]}: </Typography>
                    <span>                    
                        <form>
                            <TextField
                                select
                                variant='outlined'
                                disabled={QUANTITIES.length === 1 || QUANTITIES.length === 0}
                                value={this.state.quantity}
                                onChange={(event) => this.setState({quantity:event.target.value})}
                                SelectProps={{
                                    native: true,
                                    
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.orderSelectMenu,
                                    },
                                }}
                                >
                                {QUANTITIES.map((n,idx) => <option key={idx} value={n}> {n} </option>)}
                            </TextField>
                        </form> 
                    </span>
                    </div>

                    <div>
                    <Typography variant="caption" >{globalVariables.LABEL_SHIPPING_TO[globalVariables.LANG]}</Typography>
                    <span>
                        <form>
                            <TextField
                                select
                                variant="outlined"
                                value={this.state.governorate}
                                onChange={(event) => this.handleGovernorateChange(event)}
                                SelectProps={{
                                    native: true,
                                }}
                                InputProps={{
                                    classes: {
                                        input: classes.orderSelectMenu,
                                    },
                                }}>
                                {this.state.governorates.map((governorate, idx) => 
                                    <option key={idx} value={governorate.id}> {governorate.name} </option>
                                )}
                            </TextField>
                        </form>
                    </span>
                    </div>
                
                </div>
                
                <div className={classes.section}>
                {this.state.shipping.message !== undefined?
                    <Typography variant="caption" >{this.state.shipping.message}</Typography>
                :
                <React.Fragment>
                <p>
                    <Typography variant="caption" > {globalVariables.LABEL_PRICE[globalVariables.LANG]}:  </Typography>
                    <Typography variant="caption" > {this.state.shipping.fees} {globalVariables.LABEL_CURRENCY[globalVariables.LANG]} </Typography>
                    {/* <Typography variant="caption" > 
                    {this.state.shipping.fees} 
                    {globalVariables.LABEL_CURRENCY[globalVariables.LANG]} 
                    + 
                    (
                    {this.state.shipping.shipper.extra_weight_charge}
                    {globalVariables.LABEL_CURRENCY[globalVariables.LANG]} 
                    *
                    {globalVariables.PRODUCT_WEIGHT_CHARGE[globalVariables.LANG]} 
                    {this.state.shipping.shipper.max_weight}
                    )
                    
                    </Typography> */}
                </p>
                <p>
                    <Typography variant="caption" style={{color: 'blue'}} > {globalVariables.LABEL_PRODUCT_DELIVERED_BY[globalVariables.LANG]} </Typography>
                    <Typography variant="caption" style={{color: 'blue'}} > {this.state.shipping.min_days} - {this.state.shipping.max_days} {globalVariables.LABEL_PRODUCT_DAYS[globalVariables.LANG]} </Typography>
                </p>
                </React.Fragment>
                }
                </div>
                
                <Grid item xs={12} >
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        className={classes.addButton}
                        disabled={QUANTITIES.length===0}
                        onClick={()=>this.props.addToCart(this.state.quantity)}
                    > 
                        {globalVariables.CART_ADD[globalVariables.LANG]}      
                    </Button>               
                </Grid>
            </React.Fragment>
            :<Typography className={classes.outOfStock} align="center">
                <FontAwesomeIcon  icon={['fas', 'exclamation-triangle']} />
                {globalVariables.PRODUCT_OUT_OF_STOCK[globalVariables.LANG]}
            </Typography>
            }
            </div>
            }
            <div className={classes.supportSection}>
                {supportSection.map(item =>
                    <section key={uuid()} className={classes.infoSection}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={['fas', item.icon]} />
                        </div>
                        <div className={classes.infoText}>
                            <Typography align='left' className={classes.title} variant='h6'>{item.title[globalVariables.LANG]}</Typography>
                            <Typography align='left' className={classes.desc} variant='subtitle1'>{item.desc[globalVariables.LANG]}</Typography>
                        </div>
                    </section>
                )}
            </div>
            </React.Fragment>
        );
    }
}
export default withRouter(withStyles(styles)(AddToCart));


