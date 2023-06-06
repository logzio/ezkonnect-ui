import React, {
    FunctionComponent,
    useRef,
    useState,
    useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const LabelSelect = styled.div`
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 7px 8px;
    background: #f7f7f7;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;
    cursor: pointer;
    height: 30px;
    padding: 6px 8px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    max-width: 120px;
`;

const DropdownList = styled.ul`
    list-style: none;
    padding: 0px;
`;

const DropdownListElement = styled.li`
    padding: 6px 10px 6px 9px;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;

    &:hover {
        background: rgb(231, 231, 231) 30%;
    }
    &.disabled {
        background: rgb(231, 231, 231) 30%;
        color: #8b8c8e;
    }
`;

const ArrowIcon = styled.svg`
    transition: 0.3s all ease-in-out;

    &.animate {
        transform: rotate(180deg);
    }
`;
const DropdownListWrapper = styled.div`
    padding: 10px 0px 0px 0px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    width: 100%;
    margin-top: 3px;
    border-radius: 3px;
    display: none;
    flex-direction: column;
    border: 1px solid #d6d6d6;

    &.open {
        display: flex;
        max-height: 345px;
        overflow: scroll;
        max-width: 224px;
    }
`;
const InputSelectElement = styled.input`
    display: flex;
    font-size: 14px;
    line-height: 18px;
    width: 100%;
    color: #002e42;
    background: #f7f7f7;
    border-radius: 3px;
    padding: 0px 9px;
    height: 30px;
    border: 1px solid #002e42;
    margin: 0px 9px;
`;
const SearchIcon = styled.svg`
    position: absolute;
    right: 15px;
    top: 7px;
`;
const InputSearchWrapper = styled.div`
    position: relative;
    display: flex;
`;
const InputSelectExplanation = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    padding: 14px 8px;
    color: #002e42;
`;
const EnterIcon = styled.svg`
    margin-right: 9px;
`;
type Option = {
    name: string;
    default: boolean;
    isDisabled: boolean;
};
interface IProps {
    options: Option[];
    onChangeSelect: (option: string) => void;
    onChangeValue: (e: React.FormEvent) => void;
    currentValue: string;
    description?: string;
    placeHolder?: string;
    maxWidthSelect?: string;
}

const InputSelect: FunctionComponent<IProps> = ({
    options,
    onChangeSelect,
    onChangeValue,
    currentValue,
    placeHolder,
    maxWidthSelect,
    description,
}) => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    const onOpen = () => {
        setOpenDropDown(true);
    };

    const onChangeSelectHandler = (name: string, isDisabled: boolean) => {
        if (isDisabled) return;
        onChangeSelect(name);
    };

    const renderOptions = () => {
        return options.map((option) => {
            return (
                <DropdownListElement
                    className={`${option.isDisabled ? 'disabled' : ''}`}
                    key={option.name.replace(' ', '-')}
                    onClick={() => {
                        onChangeSelectHandler(option.name, option.isDisabled);
                    }}
                >
                    {option.name}
                </DropdownListElement>
            );
        });
    };

    const ref = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLInputElement>(null);

    const handleClickOutside = (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (ref.current && !ref.current.contains(target)) {
            setOpenDropDown(false);
        }
    };
    useLayoutEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <LabelSelect onClick={onOpen}>
                {currentValue === '' ? (
                    placeHolder
                ) : (
                    <Tag color='#f7c15c'>{currentValue}</Tag>
                )}{' '}
                <ArrowIcon
                    className={`${openDropDown ? 'animate' : ''}`}
                    width='10'
                    height='7'
                    viewBox='0 0 10 7'
                >
                    <path
                        d='M1.18164 0.539062L5 4.37695L8.81836 0.539062L10 1.71094L5 6.71094L0 1.71094L1.18164 0.539062Z'
                        fill='#AFAFAF'
                    />
                </ArrowIcon>
            </LabelSelect>
            <DropdownListWrapper className={`${openDropDown ? 'open' : ''}`}>
                <InputSearchWrapper ref={ref}>
                    <form onSubmit={onChangeValue}>
                        <InputSelectElement ref={elementRef} />
                    </form>
                    <SearchIcon
                        width='14'
                        height='15'
                        viewBox='0 0 14 15'
                        fill='none'
                    >
                        <path
                            d='M13.8359 13.9316L10.7461 10.8418C11.0469 10.4954 11.3066 10.1126 11.5254 9.69336C11.7441 9.27409 11.9036 8.82747 12.0039 8.35352V8.3125C12.0586 8.11198 12.0951 7.89779 12.1133 7.66992C12.1406 7.44206 12.1543 7.20508 12.1543 6.95898C12.1543 6.94076 12.1543 6.92708 12.1543 6.91797C12.1543 6.89974 12.1543 6.88151 12.1543 6.86328C12.1543 6.45312 12.1133 6.05208 12.0312 5.66016C11.9492 5.26823 11.8307 4.89453 11.6758 4.53906C11.5208 4.17448 11.334 3.83724 11.1152 3.52734C10.8965 3.20833 10.6504 2.91667 10.377 2.65234V2.63867C10.1035 2.36523 9.81185 2.11914 9.50195 1.90039C9.18294 1.69076 8.8457 1.50846 8.49023 1.35352C8.13477 1.19857 7.76562 1.08008 7.38281 0.998047C6.99089 0.916016 6.58984 0.875 6.17969 0.875C6.16146 0.875 6.14323 0.875 6.125 0.875C6.10677 0.875 6.08854 0.875 6.07031 0.875H6.08398C6.06576 0.875 6.04753 0.875 6.0293 0.875C6.02018 0.875 6.00651 0.875 5.98828 0.875C5.57812 0.875 5.17708 0.916016 4.78516 0.998047C4.39323 1.08008 4.01953 1.19857 3.66406 1.35352C3.30859 1.50846 2.97135 1.69076 2.65234 1.90039C2.33333 2.11914 2.03711 2.36523 1.76367 2.63867C1.49023 2.91211 1.24414 3.20833 1.02539 3.52734C0.815755 3.84635 0.633464 4.18359 0.478516 4.53906C0.323568 4.89453 0.205078 5.26823 0.123047 5.66016C0.0410156 6.05208 0 6.45312 0 6.86328C0 6.88151 0 6.89974 0 6.91797C0 6.92708 0 6.94076 0 6.95898C0 6.9681 0 6.98177 0 7C0 7.01823 0 7.03646 0 7.05469C0 7.46484 0.0410156 7.86589 0.123047 8.25781C0.205078 8.64062 0.323568 9.00977 0.478516 9.36523C0.633464 9.7207 0.815755 10.0579 1.02539 10.377C1.24414 10.6868 1.49023 10.974 1.76367 11.2383V11.252C2.03711 11.5254 2.33333 11.7715 2.65234 11.9902C2.96224 12.209 3.29492 12.3958 3.65039 12.5508C4.01497 12.7057 4.39323 12.8242 4.78516 12.9062C5.17708 12.9883 5.57812 13.0293 5.98828 13.0293C6.00651 13.0293 6.02018 13.0293 6.0293 13.0293C6.04753 13.0293 6.06576 13.0293 6.08398 13.0293C6.0931 13.0293 6.10677 13.0293 6.125 13.0293C6.14323 13.0293 6.16146 13.0293 6.17969 13.0293C6.90885 13.0293 7.59701 12.9062 8.24414 12.6602C8.89128 12.4049 9.46549 12.0586 9.9668 11.6211L13.0566 14.7109C13.1022 14.7565 13.1569 14.793 13.2207 14.8203C13.2936 14.8568 13.3665 14.875 13.4395 14.875C13.4395 14.875 13.444 14.875 13.4531 14.875C13.599 14.875 13.7266 14.8203 13.8359 14.7109C13.9453 14.6016 14 14.474 14 14.3281C14 14.319 14 14.3145 14 14.3145C14 14.2415 13.9818 14.1686 13.9453 14.0957C13.918 14.0319 13.8815 13.9772 13.8359 13.9316ZM9.59766 10.459L9.58398 10.4727C9.14648 10.9193 8.63151 11.2747 8.03906 11.5391C7.45573 11.7943 6.82682 11.9219 6.15234 11.9219C6.14323 11.9219 6.12956 11.9219 6.11133 11.9219C6.10221 11.9219 6.08854 11.9219 6.07031 11.9219H6.08398C6.07487 11.9219 6.0612 11.9219 6.04297 11.9219C6.03385 11.9219 6.02018 11.9219 6.00195 11.9219C5.32747 11.9219 4.69401 11.7943 4.10156 11.5391C3.50911 11.2747 2.99414 10.9147 2.55664 10.459C2.11003 10.0306 1.75456 9.52474 1.49023 8.94141C1.23503 8.34896 1.10742 7.71549 1.10742 7.04102C1.10742 7.02279 1.10742 7.00911 1.10742 7C1.10742 6.98177 1.10742 6.96354 1.10742 6.94531V6.95898C1.10742 6.94076 1.10742 6.92708 1.10742 6.91797C1.10742 6.89974 1.10742 6.88607 1.10742 6.87695C1.10742 6.20247 1.23503 5.56901 1.49023 4.97656C1.75456 4.38411 2.11003 3.86914 2.55664 3.43164C2.99414 2.98503 3.50911 2.63411 4.10156 2.37891C4.69401 2.11458 5.32747 1.98242 6.00195 1.98242C6.01107 1.98242 6.02018 1.98242 6.0293 1.98242C6.04753 1.98242 6.06576 1.98242 6.08398 1.98242C6.0931 1.98242 6.10221 1.98242 6.11133 1.98242C6.12956 1.98242 6.14779 1.98242 6.16602 1.98242C6.83138 1.98242 7.46029 2.11458 8.05273 2.37891C8.64518 2.63411 9.1556 2.98503 9.58398 3.43164C10.0397 3.86914 10.3952 4.38411 10.6504 4.97656C10.9147 5.56901 11.0469 6.20247 11.0469 6.87695C11.0469 6.89518 11.0469 6.91341 11.0469 6.93164C11.0469 6.94076 11.0469 6.94987 11.0469 6.95898C11.0469 6.95898 11.0469 6.96354 11.0469 6.97266C11.0469 6.97266 11.0469 6.97721 11.0469 6.98633C11.0469 7.17773 11.0378 7.36914 11.0195 7.56055C11.0013 7.74284 10.9694 7.92513 10.9238 8.10742L10.9375 8.08008C10.8281 8.54492 10.6595 8.97786 10.4316 9.37891C10.2038 9.77995 9.92578 10.14 9.59766 10.459Z'
                            fill='#002E42'
                        />
                    </SearchIcon>
                </InputSearchWrapper>
                {description ? (
                    <InputSelectExplanation>
                        <EnterIcon
                            width='14'
                            height='9'
                            viewBox='0 0 14 9'
                            fill='none'
                        >
                            <path
                                d='M13.3574 2.04492V4.84766C13.3574 5.04818 13.2845 5.22135 13.1387 5.36719C13.002 5.50391 12.8333 5.57227 12.6328 5.57227H2.625L4.68945 7.62305C4.82617 7.75977 4.89453 7.92839 4.89453 8.12891C4.89453 8.32031 4.82617 8.48438 4.68945 8.62109C4.55273 8.75781 4.38411 8.82617 4.18359 8.82617C3.99219 8.82617 3.82812 8.75781 3.69141 8.62109L0.464844 5.39453C0.31901 5.2487 0.246094 5.07552 0.246094 4.875C0.246094 4.67448 0.31901 4.5013 0.464844 4.35547L3.69141 1.12891C3.82812 0.992188 3.99219 0.923828 4.18359 0.923828C4.38411 0.923828 4.55273 0.992188 4.68945 1.12891C4.82617 1.26562 4.89453 1.43424 4.89453 1.63477C4.89453 1.82617 4.82617 1.99023 4.68945 2.12695L2.625 4.17773H11.9355V2.04492C11.9355 1.8444 12.0039 1.67578 12.1406 1.53906C12.2773 1.40234 12.446 1.33398 12.6465 1.33398C12.8379 1.33398 13.002 1.40234 13.1387 1.53906C13.2845 1.67578 13.3574 1.8444 13.3574 2.04492Z'
                                fill='#002E42'
                            />
                        </EnterIcon>
                        {description}
                    </InputSelectExplanation>
                ) : (
                    ''
                )}
                <DropdownList>{renderOptions()}</DropdownList>
            </DropdownListWrapper>
        </>
    );
};

export default InputSelect;
