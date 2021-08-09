import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import Book from '../book/Book';

const Books = () => {
    const [title, setTitle]= useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:3001/book/${title}`);
        setBooks(res.data.books);
    }
    return (
        <div className={'Books'}>
            <Grid className={'search'} container spacing={4} justifyContent="flex-end">
                <Grid>
                    <Button onClick={handleSearch}>Search Books</Button>
                </Grid>
                <Grid>
                    <TextField type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Grid>
            </Grid>
            <Grid className={'content'}>
                {books.map((b) => (
                    <React.Fragment key={b.isbn13}>
                        <Book data={b} />
                    </React.Fragment>
                ))}
            </Grid>
        </div>
    );
};

export default Books;