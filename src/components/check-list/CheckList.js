import { useMemo, useCallback, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { itemState } from './constants';
import './style.scss';


const getLocalCheckItems = () => {
    const data = JSON.parse(localStorage.getItem('checkList')) ?? [];
    const items = appConfig.pages.map((page) => {
        const item = data.find((data) => data.path === page.path);
        return {
            state: itemState.initial,
            comment: '',
            ...page,
            ...item
        };
    })
    return items;
}

const setLocalCheckItems = (items) => {
    localStorage.setItem('checkList', JSON.stringify(items))
}

const ItemState = ({ state = itemState.initial }) => {
    return <div className={`check-state-icon ${itemState[state]}`}/>
}

const CommentInput = ({ comment }) => {
    return (
        <InputGroup size="sm" className="comment-input">
            <Form.Control
                defaultValue={comment}
            />
            <Button variant="outline-secondary">
                Button
            </Button>
        </InputGroup>
    )
}

const CheckListItem = (props) => {

    const { state, name, comment, index, onClickState } = props;

    const handleClickState = useCallback((e) => {
        const { onClickState, ...rest } = props;
        onClickState?.(e.target.id, rest);
    }, [props])

    const stateButtons = useMemo(() => {
        return ['pass', 'error', 'fatal'].map((btnState) => (
            <Button
                key={btnState}
                id={btnState}
                className={`${btnState} ${btnState === state ? 'active' : ''}`}
                onClick={handleClickState}
                variant="outline">
                {btnState}
            </Button>
        ))
    }, [handleClickState, state])

    return (
        <ListGroup.Item>
            <Accordion.Item eventKey={index ?? name}>
                <Accordion.Header>
                    <ItemState state={state} />
                    {name}
                </Accordion.Header>
                <Accordion.Body>
                    {/* <CommentInput comment={comment}/> */}
                    <ButtonGroup size="sm" className='item-state-buttons'>
                        {stateButtons}
                    </ButtonGroup>
                </Accordion.Body>
            </Accordion.Item>
        </ListGroup.Item>
    )
}

export const CheckList = (props) => {

    const [items, setItems] = useState(getLocalCheckItems());
    const [activeKey, setActiveKey] = useState(null);

    const onClickState = useCallback((state, item) => {
        setItems(prev => {
            const data = prev[item.index];
            if (!data) return prev;
            const copy = [...prev]
            copy[item.index] = {
                ...data,
                // Toggle off -> Do initial
                state: data.state === state ? itemState.initial : state
            };
            setLocalCheckItems(copy)
            return copy;
        })
        setActiveKey(null)
    }, [setActiveKey])

    const list = useMemo(() => {
        return items.map(({ path, name, comment, state }, i) => (
            <CheckListItem
                key={i}
                index={i}
                name={name ?? path}
                comment={comment}
                state={state}
                onClickState={onClickState}
            />
        ));
    }, [onClickState, items]);

    const onSelect = useCallback((itemKey) => {
        setActiveKey(itemKey)
    }, [])

    return (
        <ListGroup className='check-list'>
            <Accordion activeKey={activeKey} onSelect={onSelect}>
                {list}
            </Accordion>
        </ListGroup>
    )
}