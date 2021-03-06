import React from "react";
import { withStyles } from "@material-ui/core";

import styles from '../../../assets/jss/components/parts/GeneralDescriptionForm';
import globalVariables from "../../../global-variables";

const form = props => {

    const { classes, register, errors } = props;

    return (
        <div className={classes.root}>
            
                <label htmlFor="name_en">Name (English)</label>
                <input style={{direction:'ltr'}} type="text" placeholder="" name="name_en" ref={register({ required: true, minLength: 15 })} />
                <p class="desc">{globalVariables.PRODUCT_NAME_DESC[globalVariables.LANG]}</p>
                {errors.name_en && <p>This field is required and length bigger than 15</p>}
               
            

            
                <label htmlFor="name">الاسم (بالعربي)</label>
                <input type="text" placeholder="" name="name" ref={register({ required: true, minLength: 15 })} />
                {errors.name && <p>This field is required and length bigger than 15</p>}
            

            
                <label htmlFor="price">{globalVariables.LABEL_PRICE[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="price" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.price && <p>This field is required and has to be a number</p>}
            

            
                <label htmlFor="sale_price">{globalVariables.LABEL_SALE_PRICE[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="sale_price" ref={register({ pattern: /^\d*$/ })} />
                {errors.sale_price && <p>This field is required and has to be a number</p>}
            

            
                <label htmlFor="commission">{globalVariables.LABEL_COMMISSION[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="commission" ref={register({ required: true, pattern: /^\d+$/ })} />
                <p class="desc">{globalVariables.PRODUCT_COMMISSION_DESC[globalVariables.LANG]}</p>
                {errors.commission && <p>This field is required and has to be a number greater than 0.</p>}
            

            
                <label htmlFor="quantity">{globalVariables.LABEL_QUANTITY[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="quantity" ref={register({ required: true, pattern: /^\d+$/ })} />
                {errors.quantity && <p>This field is required and has to be a number</p>}
            
                <label htmlFor="weight">{globalVariables.LABEL_WEIGHT[globalVariables.LANG]}</label>
                <input type="text" placeholder="" name="weight" ref={register({ required: true, pattern: /^\d+$/ })} />
                <p class="desc">{globalVariables.PRODUCT_WEIGHT_DESC[globalVariables.LANG]}</p>
                {errors.quantity && <p>This field is required and has to be a number</p>}

                <label htmlFor="sku">SKU</label>
                <input name="sku" placeholder="" ref={register({ required: true })} />
                <p class="desc">{globalVariables.PRODUCT_SKU_DESC[globalVariables.LANG]}</p>
                {errors.sku && <p>This field is required</p>}
            

            
                <input name="tebx" type="checkbox" ref={register} />
                {globalVariables.LABEL_PRODUCT_TEBX[globalVariables.LANG]} TEBX
                <p class="desc">{globalVariables.PRODUCT_TEBX_DESC[globalVariables.LANG]}</p>
            
        </div>
    );
}


export default withStyles(styles)(form);