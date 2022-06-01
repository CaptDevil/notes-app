import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
    const [aboutButton, setAboutButton] = React.useState(false);
    return (
        <Container maxWidth='md'>
            <div style={{ margin: '20px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' >Notes App</Typography>
                <Button variant='text' size='small' onClick={() => setAboutButton(true)}>About Us</Button>
                <Modal
                    open={aboutButton}
                    onClose={() => setAboutButton(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    >
                    <Box sx={{ ...style, width: 400 }}>
                        <Typography variant='h5'>About Us</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur veritatis quod incidunt eveniet fugit optio nemo, nostrum rerum ex laborum suscipit sed eius, beatae ad maiores error! Perferendis, aliquid commodi.</Typography>
                    </Box>
                </Modal>
            </div>
        </Container>
    );
}

export default Header;