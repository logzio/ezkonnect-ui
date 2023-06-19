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
    color: ${({ color }) => color || '#707070'};

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
    &.main-description-boxed {
        width: 80%;
        margin: 0px auto 20px auto;
    }
`;
interface IProps {
    children: React.ReactNode;
    tag: string;
    classNames?: string;
    color?: string;
}

const Text: FunctionComponent<IProps> = ({
    children,
    tag,
    classNames,
    color,
}) => {
    switch (tag) {
        case 'h2':
            return (
                <H2Section color={color} className={classNames}>
                    {children}
                </H2Section>
            );
        case 'p':
            return (
                <ParagraphSection
                    role='paragraph'
                    color={color}
                    className={classNames}
                >
                    {children}
                </ParagraphSection>
            );
        default:
            return (
                <ParagraphSection color={color} className={classNames}>
                    {children}
                </ParagraphSection>
            );
    }
};

export default Text;
