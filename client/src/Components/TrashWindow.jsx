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
        <Box sx={{ ...style, width: '70%', backgroundColor: (props.darkMode) ? '#191A1A' : 'white' }}>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px auto' }}>
                    <Paper elevation={0} sx={{ float: 'left', borderRadius: '5px', backgroundColor: (props.darkMode) ? '#191A1A': '', color: (props.darkMode) ? 'white' : '', boxSizing: 'border-box', width: '30%', border: '2px solid black', height: 340 }}>
                        <div style={{ height: '20%' }}>
                            <Typography variant='h6' style={{ padding: '2.5px 15px' }}>Trash</Typography>
                            <Typography variant='caption' style={{ padding: '0px 15px' }}>Editing not allowed</Typography>
                        </div>
                        <Divider />
                        <Paper elevation={0} sx={{ height: '80%', overflowY: 'auto', backgroundColor: (props.darkMode)?'#575A5A':'', color: (props.darkMode)?'white':'' }}>
                            <List disablePadding>
                                {notes.map((note, index) => {
                                    return (
                                        <ListItem disablePadding selected={(note._id === selectedNote._id)} divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => setSelectedNote(note)}>
                                                    <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                                    <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                                </ListItemButton>
                                                <ButtonGroup orientation='vertical' disableElevation variant='text' size='small'>
                                                    <Tooltip title='Restore'>
                                                        <Button size='small' style={{ color: '#3E7D1E', border: 'white' }} onClick={() => {
                                                            axios.post(`/restore/${note._id}`, { user: props.user })
                                                                .then((res) => {
                                                                    if(res.data === 'done') {
                                                                        if(selectedNote._id === note._id)
                                                                            setSelectedNote({})
                                                                        props.setRefresh(true)
                                                                    }
                                                                })
                                                        }}><RestoreFromTrashIcon fontSize='small' sx={{ color: (props.darkMode)?'#D8FFD8':'' }} /></Button>
                                                    </Tooltip>
                                                    <Tooltip title='Delete'>
                                                        <Button size='small' style={{ color: '#FF0101', border: 'white' }} onClick={() => {
                                                            setOpenConfirmDelete(true)
                                                            setDeleteID(note._id)
                                                        }}><DeleteForeverIcon fontSize='small' sx={{ color: (props.darkMode)?'#FF2626':'' }} /></Button>
                                                    </Tooltip>
                                                </ButtonGroup>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Paper>
                    { (Object.keys(selectedNote).length !== 0) ?
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: (props.darkMode)?'#C9C9C9':'#fff391', width: '65%', border: '2px solid black', height: 340, padding: '1.5px 0px' }}>
                        <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Container maxWidth='lg'>
                                <Input disabled disableUnderline multiline fullWidth sx={{ fontSize: '34px', marginTop: '15px', fontWeight: 700, color: (props.darkMode) ? 'white' : '' }} placeholder='Untitled Note Heading' value={selectedNote.heading} />
                                <Divider />
                                <Input disabled disableUnderline multiline fullWidth sx={{ fontSize: '18px', margin: '10px 0px 5px 0px', color: (props.darkMode) ? 'white' : '' }} placeholder='Start writing your note here...' value={selectedNote.body} />
                            </Container>
                        </div>
                    </Paper> :
                    <Paper elevation={0} sx={{ float: 'right', borderRadius: '5px', boxSizing: 'border-box', backgroundColor: '#ababab', color: (props.darkMode)?'#494A49':'#424242', width: '65%', border: '2px solid black', height: 340, padding: '15px 0px' }}>
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
                onClose={() => {
                    setOpenConfirmDelete(false)
                    setDeleteID('')
                }}
            >
                <Box sx={{ ...style, width: '25%', backgroundColor: (props.darkMode) ? '#191A1A' : 'white', color: (props.darkMode) ? 'white' : '' }}>
                    <Typography variant='h5'>Confirm Delete?</Typography>
                    <div style={{ float: 'right', marginTop: '15px' }}>
                        <Button size='small' variant={(props.darkMode)?'contained':'outlined'} onClick={() => {
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