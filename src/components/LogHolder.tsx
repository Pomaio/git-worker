import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoresContext } from '~/core/stores';

const Wrap = styled.pre`
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  padding: 20px;
  max-height: 200px;

  border-top: 2px dashed rgba(0, 0, 0, 0.25);
  overflow: auto;
`;

export const LogHolder = observer(() => {
  const { logStore } = useContext(StoresContext);
  return <Wrap>{logStore.data}</Wrap>;
});
