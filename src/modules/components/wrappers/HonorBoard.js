import React from 'react';
import uuid from 'uuid';

import { withStyles, Grid } from '@material-ui/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import Card from '../parts/withWidthCard';
import LinedTitle from '../parts/TwoLinesSectionTitle';
import XsGallery from '../parts/MiniGallery';

import './styles/CompanyInfo.css';
import './styles/topCustomer.css';

import { storesAPI } from '../../../api/api';

import styles from '../../../assets/jss/components/wrappers/HonorBoard';

class TopCustomer extends React.Component {
    state = {
        selectedImage:0,
        persons: []
    };

    componentDidMount(){
        setTimeout(this.handleImageSliding, 4000);

        storesAPI.get('/')
        .then(res => {
            const { persons } = this.state;
            for (let item of res.data){
              persons.push({
                image: item.image,
                name: item.name,
                description: item.description,
              });
            }
            this.setState({
              persons: persons,
            })
        })
        .catch(res => {
            // console.log(res)
            console.log('Error occurred')
        })
    }

    handleImageSliding = () => {
        var selectedImage = this.state.selectedImage;
        const len = this.state.persons.length;
        selectedImage= (selectedImage+1)%len;
        this.setState({selectedImage:selectedImage});
        setTimeout(this.handleImageSliding, 4000);
    }
    

    render(){
        const {classes} = this.props;
        const {persons, selectedImage} = this.state;
        return (
            persons.length?
            <Grid justify="center" alignItems='center' container className={classes.root}>
                <LinedTitle>
                    لوحة الشرف
                </LinedTitle>
                <Grid container justify="center" alignItems='center'>
                    <ReactCSSTransitionGroup 
                    component={Grid} 
                    item
                    sm={8}
                    xs={10} 
                    transitionName="topCustomer"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={2000}
                    transitionLeave={false}
                    transitionEnter={true}
                >
                    <Card style={{position:'absolute'}} key={uuid()} person={persons[selectedImage]}/>
                </ReactCSSTransitionGroup>
                </Grid>
                <Grid item sm={8} xs={10}>
                    <XsGallery persons={persons} selectedImage={selectedImage} />
                </Grid>
            </Grid>
            : null
            
        );
    }
}

export default withStyles(styles)(TopCustomer);