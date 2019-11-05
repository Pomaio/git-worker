import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import React, { useState } from 'react';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const ElementRow = ({ label }: any) => (
  <ListItem button>
    <ListItemText primary={label} />
  </ListItem>
);

export const CollapseComponent = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid item xs={11}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {['one', 'two', 'last'].map(elem => (
            <ListItem button key={elem}>
              <ListItemText primary={elem} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Grid>
  );
};
