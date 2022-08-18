import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

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

function ArchiveWindow(props) {
    const [notes, setNotes] = React.useState([]);
    const [selectedNote, setSelectedNote] = React.useState({});

    React.useEffect(() => {
        if(props.token !== null && props.token !== '') {
            axios.post('/allnotes', { token: props.token, archive: true, trash: false })
                .then((res) => setNotes(res.data))
        }
    }, [props.refresh, props.openArchives])

    React.useEffect(() => {
        if((selectedNote.body !== '' || selectedNote.heading !== '') && (Object.keys(selectedNote).length > 0) && props.token !== null && props.token !== '') {
            let interval = setTimeout(() => {
                // console.log(note)
                axios.post(`/updatenote/`, {_id: selectedNote._id, heading: selectedNote.heading, body: selectedNote.body, token: props.token})
                    .then(() => props.setRefresh(true))
            }, 3000)
            return () => {
                clearTimeout(interval)
            }
        }
    }, [selectedNote])

    return (
        <Box sx={{ ...style, width: '70%', backgroundColor: (props.darkMode) ? '#191A1A' : 'white' }}>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px auto' }}>
                    <Paper elevation={0} sx={{ float: 'left', backgroundColor: (props.darkMode) ? '#191A1A': '', color: (props.darkMode) ? 'white' : '', borderRadius: '5px', boxSizing: 'border-box', width: '30%', border: '2px solid black', height: 340 }}>
                        <div style={{ height: '15%' }}>
                            <Typography variant='h6' style={{ padding: '5px 15px' }}>Archives List</Typography>
                        </div>
                        <Divider />
                        <Paper elevation={0} sx={{ height: '85%', overflowY: 'auto', backgroundColor: (props.darkMode)?'#575A5A':'', color: (props.darkMode)?'white':'' }}>
                            <List disablePadding>
                                {notes.map((note, index) => {
                                    return (
                                        <ListItem disablePadding selected={(note._id === selectedNote._id)} divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => setSelectedNote(note)}>
                                                    <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                                    <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                                </ListItemButton>
                                                <ButtonGroup orientation='vertical' disableElevation variant='text' size='small'>
                                                    <Tooltip title='Unarchive'>
                                                        <Button style={{ color: '#3E7D1E', border: 'white' }} onClick={() => {
                                                            axios.post(`/unarchive/${note._id}`, { token: props.token })
                                                                .then((res) => {
                                                                    if(res.data === 'done') {
                                                                        if(selectedNote._id === note._id)
                                                                            setSelectedNote({})
                                                                        props.setRefresh(true)
                                                                    }
                                                                })
                                                        }}><UnarchiveIcon fontSize='small' sx={{ color: (props.darkMode)?'#D8FFD8':'' }} /></Button>
                                                    </Tooltip>
                                                    <Tooltip title='Move to trash'>
                                                        <Button style={{ color: '#FF5B5B' }} onClick={() => {
                                                            axios.post(`/trash/${note._id}`,{ token: props.token })
                                                                .then((res) => {
                                                                    if(res.data === 'done') {
                                                                        if(props.selected === note._id)
                                                                            props.getSelected('')
                                                                        props.setRefresh(true)
                                                                    }
                                                                })
                                                        }}><DeleteIcon fontSize='small' sx={{ color: (props.darkMode)?'#FFA0A0':'' }} /></Button>
                                                    </Tooltip>
                                                </ButtonGroup>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Paper>
                    { (Object.keys(selectedNote).length !== 0) ?
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: (props.darkMode)?'#4C4C4C':'#fff391', width: '65%', border: '2px solid black', height: 340, padding: '1.5px 0px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Container maxWidth='lg'>
                                <Input disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginTop: '15px', fontWeight: 700, color: (props.darkMode) ? 'white' : '' }} placeholder='Untitled Note Heading' value={selectedNote.heading} onChange={(e) => {
                                    setSelectedNote({...selectedNote, heading: e.target.value})
                                }}/>
                                <Divider />
                                <Input disableUnderline multiline fullWidth sx={{ fontSize: '18px', margin: '10px 0px 5px 0px', color: (props.darkMode) ? 'white' : '' }} placeholder='Start writing your note here...' value={selectedNote.body} onChange={(e) => {
                                    setSelectedNote({...selectedNote, body: e.target.value})
                                }}/>
                            </Container>
                        </div>
                    </Paper> :
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: '#ababab', color: (props.darkMode)?'#494A49':'#424242', width: '65%', border: '2px solid black', height: 340, padding: '15px 0px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Container maxWidth='lg'>
                                <Typography variant='subtitle1'>Select a note to view and edit.</Typography>
                            </Container>
                        </div>
                    </Paper> }
                </div>
            </Container>
        </Box>
    );
}

export default ArchiveWindow;