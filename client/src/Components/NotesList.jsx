import React from 'react';
import AdvButtons from './AdvButtons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import Divider from '@mui/material/Divider';

function NotesList(props) {
    const [notes, setNotes] = React.useState([]);
    
    React.useEffect(() => {
        if(props.refresh === true && props.user!==null) {
            axios.post('/allnotes', {user: props.user, archive: false, trash: false})
                .then((res) => {
                    setNotes(res.data)
                    props.setRefresh(false)
                })
        }
    }, [props.user, props.refresh])

    return (
        <div style={{ width: '30%', margin: '0px 5px' }}>
            <Box sx={{ border: '2px solid black', boxSizing: 'border-box', borderRadius: '5px', width: '100%', height: 300, marginBottom: 2, padding: '2px 0px' }}>
                <div style={{ height: '25%' }}>
                    <Typography variant='h6' style={{ padding: '2px 15px' }}>Notes List</Typography>
                    <Container>
                        <Button sx={{color: '#618833'}} fullWidth size='small' startIcon={<AddIcon />} onClick={() => {
                            axios.post('/newnote', {user: props.user})
                                .then((res) => {
                                    props.getSelected(res.data)
                                    props.setRefresh(true)
                                })
                        }}> New Note</Button>
                    </Container>
                </div>
                <Divider />
                <Paper elevation={0} sx={{ height: '75%', overflowY: 'auto' }}>
                    <List disablePadding>
                        {notes.map((note, index) => {
                            return (
                                <ListItem disablePadding selected={(note._id === props.selected)} divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => props.getSelected(note._id)}>
                                            <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                            <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                        </ListItemButton>
                                        <ButtonGroup orientation='vertical' disableElevation variant='text' size='small'>
                                            <Button style={{ color: 'grey', border: 'white' }} onClick={() => {
                                                axios.post(`/archive/${note._id}`, { user: props.user })
                                                    .then((res) => {
                                                        if(res.data === 'done') {
                                                            if(props.selected === note._id)
                                                                props.getSelected('')
                                                            props.setRefresh(true)
                                                        }
                                                    })
                                            }}><ArchiveIcon fontSize='small' /></Button>
                                            <Button style={{ color: 'grey' }} onClick={() => {
                                                axios.post(`/trash/${note._id}`,{ user: props.user })
                                                    .then((res) => {
                                                        if(res.data === 'done') {
                                                            if(props.selected === note._id)
                                                                props.getSelected('')
                                                            props.setRefresh(true)
                                                        }
                                                    })
                                            }}><DeleteIcon fontSize='small' /></Button>
                                        </ButtonGroup>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Box>
            <AdvButtons user={props.user} refresh={props.refresh} setRefresh={props.setRefresh} />
        </div>
    );
}

export default NotesList;