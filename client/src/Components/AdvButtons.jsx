import React from 'react';
import Box from '@mui/material/Box';
import ArchiveIcon from '@mui/icons-material/Archive';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function AdvButtons() {
    return (
        <Box sx={{ boxSizing: 'border-box', borderRadius: '5px', width: '100%', height: 184, padding: '2px 0px', overflowY: 'auto' }}>
            <List>
                <ListItem disablePadding divider>
                    <ListItemButton onClick={() => console.log('Archive')}>
                        <ListItemIcon><ArchiveIcon /></ListItemIcon>
                        <ListItemText primary='Archive'/>
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
    );
}

export default AdvButtons;