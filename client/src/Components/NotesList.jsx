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
// import DeleteIcon from '@mui/icons-material/Delete';

function NotesList(props) {
    const [notes, setNotes] = React.useState([]);
    // const [refresh, setRefresh] = React.useState(false);
    
    React.useEffect(() => {
        if(props.refresh === true) {
            axios.post('http://localhost:5000/allnotes', {user: props.user})
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
                            axios.post('http://localhost:5000/newnote', {user: props.user})
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
                                <ListItem disablePadding divider key={index}>
                                    <ListItemButton onClick={() => props.getSelected(note._id)}>
                                        <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                        <ListItemText><Typography variant='caption'>{note.body}</Typography></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Box>
            <AdvButtons />
        </div>
    );
}

export default NotesList;