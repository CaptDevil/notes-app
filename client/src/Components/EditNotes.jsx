import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';

function EditNotes() {
    return (
        <Box sx={{ border: '2px solid black', boxSizing: 'border-box', backgroundColor: '#fff391', borderRadius: '5px', width: '70%', height: 500, margin: '0px 5px', padding: '15px 0px' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Container maxWidth='lg'>
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginBottom: '10px', fontWeight: 700 }} placeholder='Untitled Note Heading' />
                    <Divider />
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '18px', marginTop: '15px' }} placeholder='Start writing your note here...'/>
                </Container>
            </div>
        </Box>
    );
}

export default EditNotes;