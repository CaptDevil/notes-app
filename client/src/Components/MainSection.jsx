import React from 'react';
import NotesList from './NotesList';
import EditNotes from './EditNotes';
import Container from '@mui/material/Container'

function MainSection(props) {
    const [selected, setSelected] = React.useState('')
    const [refresh, setRefresh] = React.useState(true)

    React.useEffect(() => {
        setRefresh(true)
    }, [props.token])

    React.useEffect(() => {
        let timer = setTimeout(() => setRefresh(false), 3000)
        return () => clearTimeout(timer)
    }, [refresh])

    return (
        <Container maxWidth='md'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <NotesList selected={selected} getSelected={(selected) => setSelected(selected)} token={props.token} refresh={refresh} setRefresh={setRefresh} darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
                <EditNotes selectedNote={selected} token={props.token} refresh={refresh} setRefresh={setRefresh} darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
            </div>
        </Container>
    );
}

export default MainSection;