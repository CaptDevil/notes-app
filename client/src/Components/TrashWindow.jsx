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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
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

function TrashWindow(props) {
    const [notes, setNotes] = React.useState([]);
    const [selectedNote, setSelectedNote] = React.useState({});
    const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState('');

    React.useEffect(() => {
        axios.post('/alltrash', { user: props.user })
            .then((res) => setNotes(res.data))
    }, [props.refresh, props.openTrash])

    return (
        <Box sx={{ ...style, width: '70%' }}>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px auto' }}>
                    <Paper elevation={0} sx={{ float: 'left', borderRadius: '5px', boxSizing: 'border-box', width: '30%', border: '2px solid black', height: 340 }}>
                        <div style={{ height: '20%' }}>
                            <Typography variant='h6' style={{ padding: '2px 15px' }}>Trash</Typography>
                            <Typography variant='caption' style={{ padding: '2px 15px' }}>Editing not allowed</Typography>
                        </div>
                        <Divider />
                        <Paper elevation={0} sx={{ height: '80%', overflowY: 'auto' }}>
                            <List disablePadding>
                                {notes.map((note, index) => {
                                    return (
                                        <ListItem disablePadding selected={(note._id === selectedNote._id)} divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => setSelectedNote(note)}>
                                                    <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                                    <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                                </ListItemButton>
                                                <ButtonGroup orientation='vertical' disableElevation variant='text' size='small'>
                                                    <Button size='small' style={{ color: 'grey', border: 'white' }} onClick={() => {
                                                        axios.post(`/restore/${note._id}`, { user: props.user })
                                                            .then((res) => {
                                                                if(res.data === 'done') {
                                                                    if(selectedNote._id === note._id)
                                                                        setSelectedNote({})
                                                                    props.setRefresh(true)
                                                                }
                                                            })
                                                    }}><RestoreFromTrashIcon fontSize='small' /></Button>
                                                    <Button size='small' style={{ color: 'grey', border: 'white' }} onClick={() => {
                                                        setOpenConfirmDelete(true)
                                                        setDeleteID(note._id)
                                                    }}><DeleteForeverIcon fontSize='small' /></Button>
                                                </ButtonGroup>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Paper>
                    { (Object.keys(selectedNote).length !== 0) ?
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: '#fff391', width: '65%', border: '2px solid black', height: 340, padding: '1.5px 0px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Container maxWidth='lg'>
                                <Input disabled disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginTop: '15px', fontWeight: 700 }} placeholder='Untitled Note Heading' value={selectedNote.heading} />
                                <Divider />
                                <Input disabled disableUnderline multiline fullWidth sx={{ fontSize: '18px', margin: '10px 0px 5px 0px' }} placeholder='Start writing your note here...' value={selectedNote.body} />
                            </Container>
                        </div>
                    </Paper> :
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: '#ababab', width: '65%', border: '2px solid black', height: 340, padding: '15px 0px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Container maxWidth='lg'>
                                <Typography variant='subtitle1'>Select a note to view.</Typography>
                                <Typography variant='subtitle1'></Typography>
                            </Container>
                        </div>
                    </Paper> }
                </div>
            </Container>
            <Modal
                open={openConfirmDelete}
                onClose={() => setOpenConfirmDelete(false)}
            >
                <Box sx={{ ...style, width: '25%' }}>
                    <Typography variant='h5'>Confirm Delete?</Typography>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <Button size='small' variant='outlined' onClick={() => {
                            setOpenConfirmDelete(false)
                            setDeleteID('')
                        }}>Cancel</Button>
                        <Button color='error' size='small' sx={{ marginLeft: '5px' }} variant='contained' onClick={() => {
                            if(deleteID !== '') {
                                axios.post(`/delete/${deleteID}`, {user: props.user})
                                    .then((res) => {
                                        if(res.data === 'done') {
                                            if(deleteID === selectedNote._id)
                                                setSelectedNote({})
                                            setDeleteID('')
                                            setOpenConfirmDelete(false)
                                            props.setRefresh(true)
                                        }
                                    })
                            }
                        }}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    );
}

export default TrashWindow;