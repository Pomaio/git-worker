import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';
import { paint } from '~/utils/paintLog';

const Wrap = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  padding: 20px;
  max-height: 200px;

  border-top: 2px dashed rgba(0, 0, 0, 0.25);
  overflow: auto;
`;

export const LogHolder = observer(() => {
  const { logStore } = useContext(StoresContext);
  return (
    <Wrap>
      {logStore.data.map((v, i) => (
        <div key={i}>
          <span style={{ color: paint(v.status), paddingRight: 7 }}>
            {v.status ? '[' + v.status + ']' : '  '}
          </span>
          {v.data}
        </div>
      ))}
    </Wrap>
  );
});
