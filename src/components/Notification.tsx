import React, { useContext } from 'react';

import { Button, Icon, Snackbar } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { StoresContext } from '~/core/stores';

export const Notification = observer(() => {
  const { scenarioStore } = useContext(StoresContext);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={scenarioStore.notificationStatus || false}
      onClose={() => scenarioStore.setNotificationStatus(false)}
      autoHideDuration={6000}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        <div id="message-id">
          {scenarioStore.notificationMessage || 'Заполнены не все поля!'}
        </div>
      }
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => scenarioStore.setNotificationStatus(false)}
        >
          <Icon>close</Icon>
        </Button>
      }
    />
  );
});
