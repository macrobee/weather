import styled from 'styled-components';

export const ForecastContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  height: 280px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  transform: translate(${props=>props.scrollDistance}px);
`