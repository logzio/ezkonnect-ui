import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const H2Section = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #335868;
    margin-bottom: 16px;
`;
const ParagraphSection = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #707070;

    &.disabled {
        font-weight: 500;
        font-size: 14px;
        color: #8c8c8c;
    }
    &.tableElement {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #464646;
    }
`;
interface IProps {
    children: React.ReactNode;
    tag: string;
    classNames?: string;
}

const Text: FunctionComponent<IProps> = ({ children, tag, classNames }) => {
    switch (tag) {
        case 'h2':
            return <H2Section className={classNames}>{children}</H2Section>;
        case 'p':
            return (
                <ParagraphSection className={classNames}>
                    {children}
                </ParagraphSection>
            );
        default:
            return (
                <ParagraphSection className={classNames}>
                    {children}
                </ParagraphSection>
            );
    }
};

export default Text;
