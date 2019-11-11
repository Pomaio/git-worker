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

interface ListProps {
  elements: string[] | undefined;
}

export const CollapseRow = observer(() => {
  const { infoStore } = useContext(StoresContext);
  const { collectionUrl } = infoStore;
  console.log('render');
  useEffect(() => {
    infoStore.fetchUrls();
  }, []);
  useEffect(() => {
    console.log('renderURL');
  }, [collectionUrl]);
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
          <ElementList elements={collectionUrl} />
        </Collapse>
      </Grid>
    </Block>
  );
});

const ElementList = ({ elements }: ListProps) => {
  return elements == [''] ? null : (
    <List component="div" disablePadding>
      {elements &&
        elements.map((elem, i) => <ElementRow label={elem} key={elem + i} />)}
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
