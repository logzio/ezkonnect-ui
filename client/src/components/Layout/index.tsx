import React, { FunctionComponent } from 'react';
import Header from '../Header';
import StatusContainer from '../../containers/StatusContainer';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    activeStep?: string;
}

const LayoutWrapper = styled.div`
    height: 100%;
    padding-top: 74px;
`;

const Layout: FunctionComponent<IProps> = ({ children, activeStep }) => {
    return (
        <LayoutWrapper>
            <Header />
            {children}
            <StatusContainer />
        </LayoutWrapper>
    );
};

export default Layout;
