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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ArchiveWindow from './ArchiveWindow';
import TrashWindow from './TrashWindow';

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
                <List disablePadding>
                    <ListItem disablePadding divider>
                        <ListItemButton onClick={() => setOpenArchives(true)}>
                            <ListItemIcon><ArchiveIcon /></ListItemIcon>
                            <ListItemText primary='Archive'/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                        <ListItemButton onClick={() => setOpenTrash(true)}>
                            <ListItemIcon><DeleteIcon /></ListItemIcon>
                            <ListItemText primary='Trash'/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => console.log('Dark Mode')}>
                            <ListItemIcon><ModeNightIcon /></ListItemIcon>
                            <ListItemText primary='Dark Mode'/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Modal
                open={openArchives}
                onClose={() => setOpenArchives(false)}
            >
                <ArchiveWindow user={props.user} openArchives={openArchives} refresh={props.refresh} setRefresh={props.setRefresh} />
            </Modal>
            <Modal
                open={openTrash}
                onClose={() => setOpenTrash(false)}
            >
                <TrashWindow user={props.user} openTrash={openTrash} refresh={props.refresh} setRefresh={props.setRefresh} />
            </Modal>
        </div>
    );
}

export default AdvButtons;