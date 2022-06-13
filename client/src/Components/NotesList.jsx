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
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
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

function NotesList(props) {
    const [notes, setNotes] = React.useState([]);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState('');
    // const [refresh, setRefresh] = React.useState(false);
    
    React.useEffect(() => {
        if(props.refresh === true && props.user!==null) {
            axios.post('/allnotes', {user: props.user})
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
                <Paper elevation={0} sx={{ height: '75%', overflowY: 'auto' }}>
                    <List>
                        {notes.map((note, index) => {
                            return (
                                <ListItem disablePadding divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => props.getSelected(note._id)}>
                                            <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                            <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                        </ListItemButton>
                                        <Button size='small' endIcon={<DeleteIcon />} style={{ color: 'grey' }} onClick={() => {
                                            setConfirmDelete(true)
                                            setDeleteID(note._id)
                                        }}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Box>
            <AdvButtons />
            <Modal
                open={confirmDelete}
                onClose={() => {
                    setConfirmDelete(false)
                    setDeleteID('')
                }}
            >
                <Box sx={{ ...style, width: '25%' }}>
                    <Typography variant='h5'>Confirm Delete?</Typography>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <Button size='small' variant='outlined' onClick={() => {
                            setConfirmDelete(false)
                            setDeleteID('')
                        }}>Cancel</Button>
                        <Button color='error' size='small' sx={{ marginLeft: '5px' }} variant='contained' onClick={() => {
                            if(deleteID !== '') {
                                axios.post(`/delete/${deleteID}`,{ user: props.user })
                                    .then((res) => {
                                        if(res.data === 'done') {
                                            props.setRefresh(true)
                                            props.getSelected('')
                                            setConfirmDelete(false)
                                            setDeleteID('')
                                        }
                                    })
                            }
                        }}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default NotesList;