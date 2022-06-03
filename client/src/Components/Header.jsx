import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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

function Header() {
    const [loginButton, setLoginButton] = React.useState(false);

    React.useEffect(() => {
        
    })

    return (
        <Container maxWidth='md'>
            <div style={{ margin: '20px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' >Notes App</Typography>
                <Button variant='text' size='small' onClick={() => setLoginButton(true)}>About Us</Button>
                <Modal
                    open={loginButton}
                    onClose={() => setLoginButton(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    >
                    <Box sx={{ ...style, width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
                        <Paper elevation={0} sx={{ float: 'left', width: '45%', padding: '2px 5px' }}>
                            <Typography variant='h5'>Register</Typography>
                            <form>
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' size='small' label='Name' placeholder='Adam Reed' />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' size='small' label='Email' placeholder='adam@email.com' />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' size='small' label='Password' />
                                <TextField fullWidth sx={{ marginTop: '15px' }} variant='standard' color='info' size='small' label='Confirm Password' />
                                <Button sx={{ margin: '20px 0', float: 'right' }} size='small' variant='outlined' color='info'>Register</Button>
                            </form>
                        </Paper>
                        <Divider orientation='vertical' flexItem  />
                        <Paper elevation={0} sx={{ float: 'right', width: '45%', padding: '2px 5px' }}>
                            <Typography variant='h5'>Login</Typography>
                            <form>
                                <TextField fullWidth sx={{ marginTop: '25px' }} variant='outlined' color='success' focused size='small' label='Email' placeholder='adam@email.com' />
                                <TextField fullWidth sx={{ marginTop: '25px' }} variant='outlined' color='success' focused size='small' label='Password' />
                                <Button sx={{ margin: '20px 0', float: 'right' }} size='small' variant='contained' color='success'>Login</Button>
                            </form>
                        </Paper>
                    </Box>
                </Modal>
            </div>
        </Container>
    );
}

export default Header;