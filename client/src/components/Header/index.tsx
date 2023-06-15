import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HelpIcon } from '../../assets/icons/help-icon.svg';
import { ReactComponent as LogoIcon } from '../../assets/icons/logzio-logo.svg';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
    -webkit-box-shadow: 0 2px 2px -1px rgb(152 162 179 / 30%),
        0 1px 5px -2px rgb(152 162 179 / 30%);
    background: #fff;
    border-bottom: 1px solid #d3dae6;
    box-shadow: 0 2px 2px -1px rgb(152 162 179 / 30%),
        0 1px 5px -2px rgb(152 162 179 / 30%);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    z-index: 100;
    width: 100%;
    justify-content: space-between;
    top: 0px;
    flex-direction: row;
    z-index: 1000;
    & a {
        text-decoration: none;
    }
`;

const TitleWrapper = styled.div`
    padding-left: 32px;
    display: flex;
    align-items: center;
`;

const TitleElement = styled.h1`
    margin: 0;
    font-size: 18px;
    line-height: 47px;
    color: #002e42;
    font-weight: 600;
`;
const MenuWrapper = styled.div`
    display: flex;
    padding-right: 32px;
    margin-top: 5px;
`;
const MenuItem = styled.div`
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & span {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        text-transform: capitalize;
        font-feature-settings: 'kern' off;
        color: #002e42;
    }
`;
const LinkWrapper = styled.a``;

const LogoIconWrapper = styled(LogoIcon)`
    margin-right: 8px;
`;
const HelpIconWrapper = styled(HelpIcon)`
    margin-bottom: 4px;
`;

const Header: FunctionComponent = () => {
    return (
        <HeaderWrapper>
            <TitleWrapper>
                <LogoIconWrapper />

                <LinkWrapper href='/'>
                    <TitleElement role='title'>Logz.io EZKonnect™</TitleElement>
                </LinkWrapper>
            </TitleWrapper>
            <MenuWrapper>
                <MenuItem>
                    <LinkWrapper href='https://deploy-preview-2403--logz-docs.netlify.app/user-guide/log-shipping/ezkonnect.html'>
                        <HelpIconWrapper />
                        <span>Help</span>
                    </LinkWrapper>
                </MenuItem>
            </MenuWrapper>
        </HeaderWrapper>
    );
};

export default Header;
