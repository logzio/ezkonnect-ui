import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    color?: string;
    onClick?: () => void;
}

const TagWrapper = styled.span`
    background: ${({ color }) => color || `#e7e7e7`};

    border: 1px solid #d7d7d7;
    border-radius: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    padding: 1px 4px;
`;
const Tag: FunctionComponent<IProps> = ({ children, ...props }) => {
    return <TagWrapper {...props}>{children}</TagWrapper>;
};

export default Tag;
