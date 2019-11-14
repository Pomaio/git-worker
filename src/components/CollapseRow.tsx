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
import React, { useContext, useEffect, useState } from 'react';

import Icon from '@material-ui/core/Icon';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';
import { StoresContext } from '~/core/stores';

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

export const CollapseRow = observer(() => {
  const { infoStore } = useContext(StoresContext);
  const { urlsCollection } = infoStore;
  useEffect(() => {
    infoStore.fetchUrls();
  }, []);
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
          <List component="div" disablePadding>
            {urlsCollection &&
              urlsCollection.map((v, i) => (
                <ElementRow
                  delete={v => infoStore.deleteUrl(v)}
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
  label: string;
  key?: any;
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
