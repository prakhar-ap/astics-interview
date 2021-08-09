import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../wrappers/TextField';
import Button from '../wrappers/Button';

function AuthForm({type}){
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [cookies, setCookies] = useCookies();
    const [authed, setAuthed] = useState(false);
    useEffect(() => {
        if (type === 'login' && cookies.token) {
            setAuthed(true);
        }
    }, [cookies.token, type]); 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCookies('token', Buffer.from(form.username.replace(/:/g, '-') + ':' + form.password).toString('base64'));
        setAuthed(true);
    }

    const isFormFilled = () => {
        return !!form.username && !!form.password;
    }
    
    return ( 
        authed ? <Redirect to={{pathname: '/'}} /> :
        <div className={'AuthForm'}>
            <div className={'content'}>
                <TextField
                    name="username"
                    label={'Username'}
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                />
            </div>
            <div className={'content'}>
                <TextField
                    name="password"
                    type="password"
                    label={'Password'}
                    value={form.password}
                    onChange={handleChange}
                />
            </div>
            <div className={'content'}>
                <Button
                    disabled={!isFormFilled()}
                    onClick={handleSubmit}>
                    {type === 'login' ? 'Login' : 'Signup'}
                </Button>
            </div>
        </div>
    );
}

AuthForm.propTypes = {
    type: PropTypes.string,
};

AuthForm.defaultProps = {
    type: 'login',
};

export default AuthForm;