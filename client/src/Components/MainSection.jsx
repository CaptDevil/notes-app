import React from 'react';
import NotesList from './NotesList';
import EditNotes from './EditNotes';
import Container from '@mui/material/Container'

function MainSection() {
    const [selected, setSelected] = React.useState('')

    return (
        <Container maxWidth='md'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <NotesList getSelected={(selected) => setSelected(selected)} />
                <EditNotes selectedNote={selected} />
            </div>
        </Container>
    );
}

export default MainSection;