import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import React, { useState } from 'react';

import Icon from '@material-ui/core/Icon';

import styled from 'styled-components';

const ElementList = () => {
  const list = (localStorage.getItem('URLS') || '').split('/..../');
  return (
    <List component="div" disablePadding>
      {list.map(elem => (
        <ElementRow label={elem} />
      ))}
    </List>
  );
};
const ElementRow = ({ label }: any) => (
  <ListItem button>
    <ListItemText primary={label} />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete">
        <Icon>delete</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const Block = styled('div')`
  padding-top: 30px;
  .MuiListItem-button-header {
    background-color: honeydew;
  }
  .MuiListItemIcon-root {
    min-width: 0;
    padding-right: 1em;
  }
  .MuiIconButton-label:hover {
    color: rgb(230, 20, 20);
  }
`;

export const CollapseRow = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Block>
      <Grid item xs={12}>
        <ListItem
          button
          onClick={handleClick}
          className="MuiListItem-button-header"
        >
          <ListItemIcon>
            <Icon>dehaze</Icon>
          </ListItemIcon>
          <ListItemText primary="Список URL" />
          {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ElementList />
        </Collapse>
      </Grid>
    </Block>
  );
};
