import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Text from '../../components/Text';

const NotFoundWrapper = styled.div`
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 1280px;
    padding-bottom: 24px;
    background: #fff;
    padding: 24px;
    border: 1px solid #e7e7e7;
    height: 100%;
    min-height: 700px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 30px;
    }
`;

const NotFound: FunctionComponent = () => {
    return (
        <>
            <NotFoundWrapper>
                <Text tag='h2'>
                    OOPS! LOOKS LIKE SOMETHING IS NOT WHERE IT’S SUPPOSED TO
                    BE...
                </Text>
                {/* <Link></Link> */}
            </NotFoundWrapper>
        </>
    );
};
export default NotFound;
