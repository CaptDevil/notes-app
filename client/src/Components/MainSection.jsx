import React from 'react';
import NotesList from './NotesList';
import EditNotes from './EditNotes';
import Container from '@mui/material/Container'

function MainSection(props) {
    const [selected, setSelected] = React.useState('')
    const [refresh, setRefresh] = React.useState(true)

    return (
        <Container maxWidth='md'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <NotesList getSelected={(selected) => setSelected(selected)} user={props.user} refresh={refresh} setRefresh={setRefresh} />
                <EditNotes selectedNote={selected} user={props.user} refresh={refresh} setRefresh={setRefresh} />
            </div>
        </Container>
    );
}

export default MainSection;