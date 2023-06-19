import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import pythonImgUrl from '../../assets/language-icons/python-logo.svg';
import javaImgUrl from '../../assets/language-icons/java-logo.svg';
import nodejsImgUrl from '../../assets/language-icons/nodejs-logo.svg';
import dotnetImgUrl from '../../assets/language-icons/dotnet-logo.svg';
import { converLanguageName } from '../../utils/covert';
interface IProps {
    identifier: string;
}

const LanguageWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;
const ImgWrapper = styled.img`
    margin-right: 5px;
`;
const LanguageLogo: FunctionComponent<IProps> = ({ identifier }) => {
    const language = converLanguageName(identifier);
    switch (language) {
        case 'python':
            return (
                <LanguageWrapper>
                    <ImgWrapper alt='python' src={pythonImgUrl} /> -
                </LanguageWrapper>
            );

        case 'java':
            return (
                <LanguageWrapper>
                    <ImgWrapper alt='java' src={javaImgUrl} /> -
                </LanguageWrapper>
            );

        case 'javascript':
            return (
                <LanguageWrapper>
                    <ImgWrapper alt='javascript' src={nodejsImgUrl} /> -
                </LanguageWrapper>
            );

        case 'dotnet':
            return (
                <LanguageWrapper>
                    <ImgWrapper alt='dotnet' src={dotnetImgUrl} /> -
                </LanguageWrapper>
            );

        default:
            return <></>;
    }
};

export default LanguageLogo;
