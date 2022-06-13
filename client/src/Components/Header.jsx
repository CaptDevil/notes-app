import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Header(props) {
    const [loginButton, setLoginButton] = React.useState(false);
    const [registerDetails, setRegisterDetails] = React.useState({ name: '', email: '', password: '', password1: '' });
    const [loginDetails, setLoginDetails] = React.useState({ email: '', password: '' });

    React.useEffect(() => {
        if(props.user === null)
            setLoginButton(true)
    }, [props.user])

    return (
        <Container maxWidth='md'>
            <div style={{ margin: '20px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' >Notes App</Typography>
                { (props.user === null) ? <Button variant='text' size='small' onClick={() => setLoginButton(true)}>Login</Button> : <Button variant='text' size='small' onClick={() => {
                    localStorage.removeItem('user')
                    props.setUser('')
                    setLoginButton(true)
                }}>{props.user}</Button>}
                <Modal
                    open={loginButton}
                    onClose={() => setLoginButton(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
                        <Paper elevation={0} sx={{ float: 'left', width: '45%', padding: '2px 5px' }}>
                            <Typography variant='h5'>Register</Typography>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                if(registerDetails.password === registerDetails.password1) {
                                    axios.post('/registeruser', registerDetails)
                                        .then((res) => {
                                            if(res.data === 'registered') {
                                                localStorage.setItem('user', registerDetails.email)
                                                props.setUser(registerDetails.email)
                                                setRegisterDetails({ name: '', email: '', password: '', password1: '' })
                                                setLoginButton(false)
                                            }
                                        })
                                        .catch((err) => console.log(err))
                                }
                            }}>
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' type='text' size='small' label='Name' value={registerDetails.name} placeholder='Adam Reed' onChange={(e) => setRegisterDetails({...registerDetails, name: e.target.value})} />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' type='email' size='small' label='Email' value={registerDetails.email} placeholder='adam@email.com' onChange={(e) => setRegisterDetails({...registerDetails, email: e.target.value})} />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' type='password' size='small' label='Password' value={registerDetails.password} onChange={(e) => setRegisterDetails({...registerDetails, password: e.target.value})} />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' type='password' size='small' label='Confirm Password' value={registerDetails.password1} onChange={(e) => setRegisterDetails({...registerDetails, password1: e.target.value})} />
                                <Button type='submit' sx={{ margin: '20px 0', float: 'right' }} size='small' variant='outlined' color='info'>Register</Button>
                            </form>
                        </Paper>
                        <Divider orientation='vertical' flexItem  />
                        <Paper elevation={0} sx={{ float: 'right', width: '45%', padding: '2px 5px' }}>
                            <Typography variant='h5'>Login</Typography>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                // console.log(loginDetails)
                                if(loginDetails.email !== '' && loginDetails.password !== '') {
                                    axios.post('/loginuser', loginDetails)
                                        .then((res) => {
                                            if(res.data === 'right') {
                                                localStorage.setItem('user', loginDetails.email)
                                                props.setUser(loginDetails.email)
                                                setLoginDetails({ email: '', password: '' })
                                                setLoginButton(false)
                                            }
                                        })
                                        .catch((err) => console.log(err))
                                }
                            }}>
                                <TextField fullWidth sx={{ marginTop: '25px' }} variant='outlined' type='email' color='success' focused size='small' label='Email' value={loginDetails.email} placeholder='adam@email.com' onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})} />
                                <TextField fullWidth sx={{ marginTop: '25px' }} variant='outlined' type='password' color='success' focused size='small' label='Password' value={loginDetails.password} onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} />
                                <Button type='submit' sx={{ margin: '20px 0', float: 'right' }} size='small' variant='contained' color='success'>Login</Button>
                            </form>
                        </Paper>
                    </Box>
                </Modal>
            </div>
        </Container>
    );
}

export default Header;