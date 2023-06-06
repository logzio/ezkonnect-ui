import React, { FunctionComponent, useContext, useState } from 'react';
import Button from '../../components/Button';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

import { PodContext } from '../../context/pods/podContext';

interface IProps {
    type: string;
    dataIndifier: string;
    isTouched: boolean;
    status: boolean;
}

const RowContoller: FunctionComponent<IProps> = ({
    type,
    dataIndifier,
    isTouched,
    status,
}) => {
    const { updatePod, updatePodAPI } = useContext(PodContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClickHandler = async (status: boolean) => {
        setIsLoading(true);
        try {
            await updatePodAPI(type, dataIndifier, status)
                .then(() => {
                    setIsLoading(false);
                })
                .catch((err: Error) => {
                    setIsLoading(false);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const onClickAddInstrumentation = () => {
        updatePod(type, dataIndifier);
    };

    if (!isTouched && !status) {
        return (
            <Button
                color='white'
                onClick={onClickAddInstrumentation}
                hintMessage='Add instrumentation to this pod. This will be saved locally.'
            >
                Add Instrumentation
            </Button>
        );
    }
    console.log(status);
    return (
        <>
            {status ? (
                <Button
                    color='yellow'
                    onClick={() => {
                        onClickHandler(status);
                    }}
                    hintMessage='Revert the changes applied to your Logz.io account'
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon /> RollBacking
                        </>
                    ) : (
                        'Rollback'
                    )}
                </Button>
            ) : (
                <Button
                    color='yellow'
                    onClick={() => {
                        onClickHandler(status);
                    }}
                    hintMessage='Apply changes to your Logz.io account'
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon /> Deploying
                        </>
                    ) : (
                        'Deploy'
                    )}
                </Button>
            )}
        </>
    );
};

export default RowContoller;
