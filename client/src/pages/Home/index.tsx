import React, {
    FunctionComponent,
    useState,
    useContext,
    useEffect,
} from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import Text from '../../components/Text';
import TabBodyLogs from '../../containers/TabBodyLogs';
import TabBodyMetrics from '../../containers/TabBodyMetrics';
import TabBodyTraces from '../../containers/TabBodyTraces';
import StatusContainer from '../../containers/StatusContainer';
import { PodContext } from '../../context/pods/podContext';

enum NotificationStatus {
    'Success',
    'Info',
    'Warning',
    'Danger',
}

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const TextWrapper = styled.div`
    text-align: center;
    margin: auto;
`;

const TabController = styled.div`
    margin-top: 35px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
`;
const TabContainer = styled.div`
    margin-top: 35px;
`;

const TabElement = styled.div`
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    display: flex;
    color: #002e42;
    padding: 8px 25px;
    border-bottom: 1px solid #002e42;

    z-index: 100;
    &.active {
        border-bottom: 3px solid #f7c15c;
    }
`;

type TabVariable = 'Logs' | 'Metrics' | 'Traces';
type Notification = {
    message: string;
    type: NotificationStatus.Success;
    title: string;
};
const Home: FunctionComponent = () => {
    const [activeTab, setActiveTab] = useState<TabVariable>('Logs');
    const { getAllPods } = useContext(PodContext);
    useEffect(() => {
        getAllPods();
    }, []);

    const renderTab = () => {
        switch (activeTab) {
            case 'Logs':
                return <TabBodyLogs />;
            case 'Traces':
                return <TabBodyTraces />;
            default:
                return <TabBodyLogs />;
        }
    };

    return (
        <Layout>
            <HomePageWrapper>
                <TextWrapper>
                    <Text
                        color='#002E42'
                        tag={'p'}
                        classNames={'main-description-boxed'}
                    >
                        Logz.io EZKonnect™ lets you enhance your Logz.io Open
                        360 Observability platform by finding and assigning log,
                        metrics, and trace types in your pods.
                    </Text>
                    <Text color='#002E42' tag={'p'}>
                        Click on the <b> Add</b> button to add your chosen type,
                        and click on <b>Deploy</b> to apply the changes to your
                        Logz.io account.
                    </Text>
                </TextWrapper>
                <TabController>
                    <TabElement
                        className={activeTab === 'Logs' ? 'active' : ''}
                        onClick={() => setActiveTab('Logs')}
                    >
                        Logs
                    </TabElement>

                    <TabElement
                        className={activeTab === 'Traces' ? 'active' : ''}
                        onClick={() => setActiveTab('Traces')}
                    >
                        Traces
                    </TabElement>
                </TabController>
                <TabContainer>{renderTab()}</TabContainer>
            </HomePageWrapper>
        </Layout>
    );
};
export default Home;
