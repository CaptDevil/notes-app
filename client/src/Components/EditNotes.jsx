import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Typography from '@mui/material/Typography';

function EditNotes(props) {
    const [note, setNote] = React.useState({id: '', heading: '', body: ''});

    React.useEffect(() => {
        if(note.body !== '' || note.heading !== '') {
            let interval = setTimeout(() => {
                // console.log(note)
                axios.post(`http://localhost:5000/updatenote/`, note)
                    .then(() => props.setRefresh(true))
            }, 5000)
            return () => {
                clearTimeout(interval)
            }
        }
    }, [note])

    React.useEffect(() => {
        if(props.selectedNote !== '') {
            axios.get(`http://localhost:5000/getnote/${props.selectedNote}`)
                .then((res) => setNote(res.data))
        }
    },[props.selectedNote])

    return ( props.selectedNote !== '' ?
        <Box sx={{ border: '2px solid black', boxSizing: 'border-box', backgroundColor: '#fff391', borderRadius: '5px', width: '70%', height: 500, margin: '0px 5px', padding: '15px 0px' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Container maxWidth='lg'>
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginBottom: '10px', fontWeight: 700 }} placeholder='Untitled Note Heading' value={note.heading} onChange={(e) => {
                        setNote({...note, heading: e.target.value})
                    }}/>
                    <Divider />
                    <Input disableUnderline multiline fullWidth sx={{ fontSize: '18px', marginTop: '15px' }} placeholder='Start writing your note here...' value={note.body} onChange={(e) => {
                        setNote({...note, body: e.target.value})
                    }}/>
                </Container>
            </div>
        </Box> :
        <Box sx={{ border: '2px solid black', boxSizing: 'border-box', backgroundColor: '#ababab', borderRadius: '5px', width: '70%', height: 500, margin: '0px 5px', padding: '15px 0px' }}>
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Container maxWidth='lg'>
                    <Typography variant='subtitle1'>Select new note or click on existing to start writing</Typography>
                </Container>
            </div>
        </Box>
    );
}

export default EditNotes;