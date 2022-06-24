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
import ArchiveIcon from '@mui/icons-material/Archive';
import Divider from '@mui/material/Divider';
// import Tooltip from '@mui/material/Tooltip';
import LabelIcon from '@mui/icons-material/Label';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function NotesList(props) {
    const [notes, setNotes] = React.useState([]);
    const [selectedNote, setSelectedNote] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const openMenu1 = Boolean(anchorEl1);
    
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
                        <Button sx={{color: (props.darkMode)?'#00AF00':'#3E7D1E' }} fullWidth size='small' startIcon={<AddIcon />} onClick={() => {
                            axios.post('/newnote', {user: props.user})
                                .then((res) => {
                                    props.getSelected(res.data)
                                    props.setRefresh(true)
                                })
                        }}> New Note</Button>
                    </Container>
                </div>
                <Divider />
                <Paper elevation={0} sx={{ height: '75%', overflowY: 'auto', backgroundColor: (props.darkMode)?'#575A5A':'', color: (props.darkMode)?'white':'' }}>
                    <List disablePadding>
                        {notes.map((note, index) => {
                            return (
                                <ListItem disablePadding selected={(note._id === props.selected)} divider key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <ListItemButton style={{ display: 'block', paddingTop: '2px', width: '90%' }} onClick={() => props.getSelected(note._id)}>
                                        <ListItemText><Typography variant='body1'>{note.heading}</Typography></ListItemText>
                                        <ListItemText><Typography variant='caption'>{(note.body !== '') ? note.body.substring(0,20)+'...' : ''}</Typography></ListItemText>
                                    </ListItemButton>
                                    <IconButton sx={{ color: (props.darkMode)?'white':'' }} onClick={(e) => {
                                        setAnchorEl(e.currentTarget)
                                        setSelectedNote(note)
                                    }}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Box>
            <Menu
                PaperProps={{
                    style: {
                        backgroundColor: (props.darkMode)?'black':'white',
                    }
                }}
                open={openMenu}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem key={`archive-${selectedNote._id}`} style={{ color: (props.darkMode)?'white':'black', border: 'none' }} onClick={() => {
                    setAnchorEl(null)
                    axios.post(`/archive/${selectedNote._id}`, { user: props.user })
                        .then((res) => {
                            if(res.data === 'done') {
                                if(props.selected === selectedNote._id)
                                    props.getSelected('')
                                props.setRefresh(true)
                            }
                        })
                }}>
                    <Button disableRipple disableFocusRipple disableTouchRipple disableElevation variant='text' startIcon={<ArchiveIcon />} sx={{ textTransform: 'none', color: (props.darkMode)?'white':'black', border: 'none'}} >
                        <Typography variant='body2'>Archive</Typography>
                    </Button>
                </MenuItem>
                <MenuItem key={`labels-${selectedNote._id}`} style={{ color: (props.darkMode)?'white':'black', border: 'none' }} onClick={(e) => {
                    setAnchorEl(null)
                    console.log('Label window')
                    setAnchorEl1(e.currentTarget)
                }}>
                    <Button disableRipple disableFocusRipple disableTouchRipple disableElevation variant='text' fullWidth startIcon={<LabelIcon />} endIcon={<ArrowRightIcon />} sx={{ textTransform: 'none', color: (props.darkMode)?'white':'black', border: 'none'}} >
                        <Typography variant='body2'>Add Labels</Typography>
                    </Button>
                </MenuItem>
                <MenuItem key={`delete-${selectedNote._id}`} style={{ color: (props.darkMode)?'white':'black' }} onClick={() => {
                    setAnchorEl(null)
                    axios.post(`/trash/${selectedNote._id}`,{ user: props.user })
                        .then((res) => {
                            if(res.data === 'done') {
                                if(props.selected === selectedNote._id)
                                    props.getSelected('')
                                props.setRefresh(true)
                            }
                        })
                }}>
                    <Button disableRipple disableFocusRipple disableTouchRipple disableElevation variant='text' startIcon={<DeleteIcon />} sx={{ textTransform: 'none', color: (props.darkMode)?'white':'black', border: 'none'}} >
                        <Typography variant='body2'>Trash</Typography>
                    </Button>
                </MenuItem>
            </Menu>
            <Menu
                PaperProps={{
                    style: {
                        backgroundColor: (props.darkMode)?'black':'white',
                    }
                }}
                open={openMenu1}
                anchorEl={anchorEl1}
                onClose={() => setAnchorEl1(null)}
            >
                <MenuItem>Label 1</MenuItem>
                <MenuItem>Label 2</MenuItem>
                <MenuItem>Label 3</MenuItem>
            </Menu>
            <AdvButtons user={props.user} refresh={props.refresh} setRefresh={props.setRefresh} darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
        </div>
    );
}

export default NotesList;