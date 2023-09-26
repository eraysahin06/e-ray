import React from 'react';
import styled from 'styled-components';

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledTab = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
  color: black;
  border-bottom: 3px solid black;
  `
      : `
  color: #555;
  `}
`;

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <StyledTabs>
      {tabs.map((tabName) => (
        <StyledTab
          key={tabName}
          onClick={() => {
            onChange(tabName);
          }}
          active={tabName === active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
};

export default Tabs;
