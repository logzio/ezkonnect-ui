import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import pythonImgUrl from '../../assets/language-icons/python-logo.svg';
import javaImgUrl from '../../assets/language-icons/java-logo.svg';
import nodejsImgUrl from '../../assets/language-icons/nodejs-logo.svg';
import dotnetImgUrl from '../../assets/language-icons/dotnet-logo.svg';

interface IProps {
    language: string;
}

const LanguageWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;
const ImgWrapper = styled.img`
    margin-right: 5px;
`;
const LanguageLogo: FunctionComponent<IProps> = ({ language }) => {
    switch (language) {
        case 'python':
            return (
                <LanguageWrapper>
                    <ImgWrapper src={pythonImgUrl} /> -
                </LanguageWrapper>
            );

        case 'java':
            return (
                <LanguageWrapper>
                    <ImgWrapper src={javaImgUrl} /> -
                </LanguageWrapper>
            );

        case 'nodejs':
            return (
                <LanguageWrapper>
                    <ImgWrapper src={nodejsImgUrl} /> -
                </LanguageWrapper>
            );

        case 'dotnet':
            return (
                <LanguageWrapper>
                    <ImgWrapper src={dotnetImgUrl} /> -
                </LanguageWrapper>
            );

        default:
            return <></>;
    }
};

export default LanguageLogo;
