import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';

function EditNotes(props) {
    const [note, setNote] = React.useState({heading: '', body: ''});

    React.useEffect(() => {
        if(note.body !== '' || note.heading !== '') {
            let interval = setTimeout(() => {
                // console.log(note)
                axios.post(`/updatenote/`, note)
                    .then(() => props.setRefresh(true))
            }, 3000)
            return () => {
                clearTimeout(interval)
            }
        }
    }, [note])

    React.useEffect(() => {
        if(props.selectedNote !== '') {
            axios.post(`/getnote/${props.selectedNote}`, {user: props.user})
                .then((res) => setNote(res.data))
        }
    },[props.selectedNote])

    return ( props.selectedNote !== '' ?
        <Box sx={{ border: '2px solid black', boxSizing: 'border-box', backgroundColor: (props.darkMode)?'#4C4C4C':'#fff391', borderRadius: '5px', width: '70%', height: 500, margin: '0px 5px', padding: '1.5px 0px' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Container maxWidth='lg'>
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginTop: '20px', fontWeight: 700, color: (props.darkMode) ? 'white' : '' }} placeholder='Untitled Note Heading' value={note.heading} onChange={(e) => {
                        setNote({...note, heading: e.target.value})
                    }}/>
                    <Divider sx={{ backgroundColor: (props.darkMode)?'white':'' }} />
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '18px', margin: '15px 0px 10px 0px', color: (props.darkMode) ? 'white' : '' }} placeholder='Start writing your note here...' value={note.body} onChange={(e) => {
                        setNote({...note, body: e.target.value})
                    }}/>
                </Container>
            </div>
        </Box> :
        <Box sx={{ border: '2px solid black', boxSizing: 'border-box', backgroundColor: '#ababab', color: (props.darkMode)?'#494A49':'#424242', borderRadius: '5px', width: '70%', height: 500, margin: '0px 5px', padding: '15px 0px' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Container maxWidth='lg'>
                    <Typography variant='subtitle1'>Create new note or click on existing to start writing.</Typography>
                    <Typography variant='body2'>Click on <ArchiveIcon fontSize='small' /> to archive a note.</Typography>
                    <Typography variant='body2'>Click on <DeleteIcon fontSize='small' /> to move a note to trash.</Typography>
                </Container>
            </div>
        </Box>
    );
}

export default EditNotes;