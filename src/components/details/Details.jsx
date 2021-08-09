import { Grid, Paper} from '@material-ui/core'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ResponsiveImage from '../common/images/ResponsiveImage';

const Details = ({ match }) => {
    const {
      params: { isbn13 },
    } = match;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
        const getBook = async () => {
            const res = await axios(`http://localhost:3001/books/${isbn13}`);
            setData(res.data);
            setIsLoading(false);
        };

        getBook();
    }, [isbn13]);
  
    if (isLoading) {
        return (
            <div>Loading Data...</div>
        );
    }

    return (
          <div className={'Details'}>
            <Grid container spacing={3} item xs={12} className={'customerInfo'}>
                <Grid className={'details'} container spacing={2} item xs={12}>
                    <Grid item xs={4}>
                        <img src={data.image} alt="" />
                    </Grid>
                    <Grid className={'content'}>
                        <span className={'title'}>{data.title}</span><span className={'price'}>({data.price})</span>
                        <span className={'subtitle'}>{data.subtitle}</span><span className={'authors'}>{data.authors}</span>
                    </Grid>
                </Grid>
            </Grid>
          </div>
      );
  };
export default Details;