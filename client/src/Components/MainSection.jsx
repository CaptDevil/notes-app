import React from 'react';
import NotesList from './NotesList';
import EditNotes from './EditNotes';
import Container from '@mui/material/Container'

function MainSection() {
    return (
        <Container maxWidth='md'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <NotesList />
                <EditNotes />
            </div>
        </Container>
    );
}

export default MainSection;