import React, {
    FunctionComponent,
    useRef,
    useState,
    useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { ReactComponent as EnterIcon } from '../../assets/icons/chevron-down-small.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as SelectIcon } from '../../assets/icons/select-icon.svg';

interface ILabelSelect {
    fieldDisabled?: boolean;
    maxWidth?: string;
}

const LabelSelect = styled.div<ILabelSelect>`
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
    max-width: ${({ maxWidth }) => maxWidth || `120px`};
    ${({ fieldDisabled }) => {
        return fieldDisabled
            ? `
		opacity:0.7;
		background:rgb(218 217 217);
		`
            : '';
    }}
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
const FormWrapper = styled.form`
    display: flex;
    width: 100%;
`;
const ArrowIcon = styled(SelectIcon)`
    transition: 0.3s all ease-in-out;

    &.animate {
        transform: rotate(180deg);
    }
    &.disabledIcon {
        display: none;
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
const SearchIconWrapper = styled(SearchIcon)`
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
const EnterIconWrapper = styled(EnterIcon)`
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
    fieldDisabled?: boolean;
    maxWidthSelect?: string;
}

const InputSelect: FunctionComponent<IProps> = ({
    options,
    onChangeSelect,
    onChangeValue,
    currentValue,
    placeHolder,
    maxWidthSelect,
    fieldDisabled = false,
    description,
}) => {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    const onOpen = () => {
        if (fieldDisabled) {
            return;
        }
        setOpenDropDown(true);
    };

    const onSubmitInput = (e: React.FormEvent) => {
        e.preventDefault();
        onChangeValue(e);
        setOpenDropDown(false);
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
            <LabelSelect
                fieldDisabled={fieldDisabled}
                onClick={onOpen}
                maxWidth={maxWidthSelect}
            >
                {currentValue === '' ? (
                    placeHolder
                ) : (
                    <Tag color='#f7c15c'>{currentValue}</Tag>
                )}{' '}
                <ArrowIcon
                    className={`${openDropDown ? 'animate' : ''} ${
                        fieldDisabled ? 'disabledIcon' : ''
                    }`}
                />
            </LabelSelect>
            <DropdownListWrapper className={`${openDropDown ? 'open' : ''}`}>
                <InputSearchWrapper ref={ref}>
                    <FormWrapper title='Select Form' onSubmit={onSubmitInput}>
                        <InputSelectElement
                            title='Select Input'
                            ref={elementRef}
                        />
                    </FormWrapper>
                    <SearchIconWrapper />
                </InputSearchWrapper>
                {description ? (
                    <InputSelectExplanation>
                        <EnterIconWrapper />
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
