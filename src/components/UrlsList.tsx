import {
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import React, { useContext, useState } from 'react';

import Icon from '@material-ui/core/Icon';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';
import { StoresContext } from '~/core/stores';

const Block = styled('div')`
  padding-top: 30px;
  .MuiListItem-button-header {
    border: 2px solid #c4c4c4;
    border-radius: 7px;
  }
  .MuiListItemIcon-root {
    min-width: 0;
    padding-right: 1em;
  }
  .MuiIconButton-label:hover {
    color: rgb(230, 20, 20);
  }
`;

export const UrlsList = observer(() => {
  const { gitStore } = useContext(StoresContext);
  const { urlCollection } = gitStore;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    urlCollection?.length !== 0 ? setOpen(!open) : setOpen(false);
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
          <List component="div" disablePadding>
            {urlCollection?.map((v, i) => (
              <ElementRow
                delete={v => gitStore.deleteUrl(v)}
                label={v}
                key={v + i}
              />
            ))}
          </List>
        </Collapse>
      </Grid>
    </Block>
  );
});

interface RowProps {
  delete?: any;
  key?: any;
  label: string;
}

const ElementRow = ({ label, ...anyProp }: RowProps) => (
  <ListItem button>
    <ListItemText primary={label} />
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => anyProp.delete(label)}
      >
        <Icon>delete</Icon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
