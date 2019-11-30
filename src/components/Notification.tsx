import React, { useContext } from 'react';

import { Button, Icon, Snackbar } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { StoresContext } from '~/core/stores';

export const Notification = observer(() => {
  const { scriptStore } = useContext(StoresContext);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={scriptStore.notificationStatus || false}
      onClose={() => scriptStore.setNotificationStatus(false)}
      autoHideDuration={6000}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        <div id="message-id">
          {scriptStore.notificationMessage || 'Заполнены не все поля!'}
        </div>
      }
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => scriptStore.setNotificationStatus(false)}
        >
          <Icon>close</Icon>
        </Button>
      }
    />
  );
});
