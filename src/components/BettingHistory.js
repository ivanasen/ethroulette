import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core';

const HistoryRoot = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 50px;
`

const Title = styled(Typography)`
  color: white !important;
  margin: 20px auto !important;
  display: block;
`;

export default () => {
  return (
    <HistoryRoot>
      <Title variant="display1">
        Betting History
      </Title>
    </HistoryRoot>
  )
}
