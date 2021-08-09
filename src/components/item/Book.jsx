import {Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ResponsiveImage from '../common/images/ResponsiveImage';

function Book({ data }) {
    const history = useHistory();
    const sendToDetailsPage = () => {
        history.push(`/books/${data.isbn13}`);
    }
    return (
        <div className={'Book'}>
            <Paper elevation={4} onClick={() => sendToDetailsPage()} className={'paper'}>
                <Grid container spacing={2} item xs={12} justifyContent="space-between">
                    <Grid item xs={3}>
                        <ResponsiveImage src={data.image} height={300} width={250} />
                    </Grid>
                    <Grid item xs={9} className={'content'}>
                        <Grid container spacing={2}>
                            {Object.keys(data).map((key) => key !== 'image' && key !== 'url' && (
                                <Grid
                                    item
                                    xs={12}
                                    key={key}
                                    className={'field'}>
                                    <span className={'title'}>{key}: &nbsp; &nbsp;</span>
                                    <span className={'value'}>{data[key]}</span>
                                </Grid>
                            ))}
                        </Grid>   
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Book;