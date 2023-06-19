import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
}
const TabWrapper = styled.div`
    max-width: 1360px;
    width: 100%;
    margin: auto;
`;

const Tab: FunctionComponent<IProps> = ({ children }) => {
    return <TabWrapper>{children}</TabWrapper>;
};

export default Tab;
