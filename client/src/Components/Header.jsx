import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Header() {
    return (
        <Container maxWidth='md'>
            <div style={{ margin: '20px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' >Notes App</Typography>
                <Button variant='contained' size='small'>Login</Button>
            </div>
        </Container>
    );
}

export default Header;