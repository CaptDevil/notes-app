import React from 'react';
import Box from '@mui/material/Box';
import ArchiveIcon from '@mui/icons-material/Archive';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import ArchiveWindow from './ArchiveWindow';
import TrashWindow from './TrashWindow';
import LightModeIcon from '@mui/icons-material/LightMode';
import Divider from '@mui/material/Divider';

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

function AdvButtons(props) {
    const [openArchives, setOpenArchives] = React.useState(false);
    const [openTrash, setOpenTrash] = React.useState(false);

    return (
        <div>
            <Box sx={{ boxSizing: 'border-box', borderRadius: '5px', width: '100%', height: 184, padding: '2px 0px', overflowY: 'auto' }}>
                <List disablePadding >
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => setOpenArchives(true)}>
                            <ListItemIcon><ArchiveIcon sx={{ color: (props.darkMode) ? 'white' : '' }} /></ListItemIcon>
                            <ListItemText primary='Archive'/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ backgroundColor: (props.darkMode) ? 'white' : '' }} />
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => setOpenTrash(true)}>
                            <ListItemIcon><DeleteIcon sx={{ color: (props.darkMode) ? 'white' : '' }} /></ListItemIcon>
                            <ListItemText primary='Trash'/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ backgroundColor: (props.darkMode) ? 'white' : '' }} />
                    <ListItem disablePadding >
                        {(props.darkMode) ? 
                            <ListItemButton onClick={() => props.setDarkMode(false)}>
                                <ListItemIcon><LightModeIcon sx={{ color:  'white' }} /></ListItemIcon>
                                <ListItemText primary='Light Mode'/>
                            </ListItemButton> :
                            <ListItemButton onClick={() => props.setDarkMode(true)}>
                                <ListItemIcon><ModeNightIcon /></ListItemIcon>
                                <ListItemText primary='Dark Mode'/>
                            </ListItemButton>
                        }
                    </ListItem>
                </List>
            </Box>
            <Modal
                open={openArchives}
                onClose={() => setOpenArchives(false)}
            >
                <ArchiveWindow user={props.user} openArchives={openArchives} refresh={props.refresh} setRefresh={props.setRefresh} darkMode={props.darkMode} />
            </Modal>
            <Modal
                open={openTrash}
                onClose={() => setOpenTrash(false)}
            >
                <TrashWindow user={props.user} openTrash={openTrash} refresh={props.refresh} setRefresh={props.setRefresh} darkMode={props.darkMode} />
            </Modal>
        </div>
    );
}

export default AdvButtons;