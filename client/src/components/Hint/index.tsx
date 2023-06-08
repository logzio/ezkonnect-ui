import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    color?: string;
    // elementHover: ref
}

const HintWrapper = styled.span`
    background: ${({ color }) => color || `#e7e7e7`};

    border: 1px solid #d7d7d7;
    border-radius: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    padding: 1px 4px;
`;
const Hint: FunctionComponent<IProps> = ({ children, ...props }) => {
    return <HintWrapper {...props}>{children}</HintWrapper>;
};

export default Hint;
