import React, { FunctionComponent, useContext, useState } from 'react';
import Button from '../../components/Button';
import { PodContext } from '../../context/pods/podContext';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

interface IProps {
    type: string;
    podName?: string;
    podLogType?: string;
    bulkStatus?: boolean;
    isTouched?: boolean;
    dataIndifier?: string;
    onSelectValue?: string;
}

const LogsButtonController: FunctionComponent<IProps> = ({
    type,
    podName,
    podLogType,
    isTouched,
    dataIndifier,
    onSelectValue,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { addLogTypeAPI, updateLogTypeBulkAPI, updateLogTypeBulk } =
        useContext(PodContext);
    const onClickChangeLogType = async (
        podName: string,
        isDelete?: boolean,
    ) => {
        try {
            setIsLoading(true);
            await addLogTypeAPI(podName, isDelete);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    const onClickBulkAddLogType = async () => {
        updateLogTypeBulk(dataIndifier, onSelectValue);
    };
    const onClickBulkChangeLogTypeAPI = async (bulkStatus: boolean) => {
        setIsLoading(true);

        try {
            await updateLogTypeBulkAPI(dataIndifier, bulkStatus);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };

    switch (type) {
        case 'Undetected':
            if (podLogType !== '' && !isTouched) {
                return (
                    <Button
                        color='white'
                        onClick={() => {
                            onClickChangeLogType(podName!, true);
                        }}
                    >
                        Remove log type
                    </Button>
                );
            } else {
                return (
                    <Button
                        color='white'
                        onClick={() => {
                            onClickChangeLogType(podName!);
                        }}
                    >
                        Add log type
                    </Button>
                );
            }
        default:
            if (podLogType === '') {
                return (
                    <Button
                        color='white'
                        onClick={onClickBulkAddLogType}
                        disabled={isTouched}
                    >
                        Add log type
                    </Button>
                );
            }
            if (podLogType !== '' && !isTouched) {
                return (
                    <Button
                        color='yellow'
                        onClick={() => {
                            onClickBulkChangeLogTypeAPI(false);
                        }}
                        hintMessage='Revert the changes applied to your Logz.io account'
                    >
                        {isLoading ? (
                            <>
                                <SpinnerIcon /> Rollbacking
                            </>
                        ) : (
                            'Rollback'
                        )}
                    </Button>
                );
            } else {
                return (
                    <Button
                        color='yellow'
                        onClick={() => {
                            onClickBulkChangeLogTypeAPI(true);
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
                );
            }
    }
};

export default LogsButtonController;
