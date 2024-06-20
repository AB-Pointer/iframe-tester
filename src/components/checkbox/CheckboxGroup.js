import { useCallback, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './style.scss';



const CheckboxItem = (props) => {

    const {
        name,
        checked,
        text,
        onClick,
        title
    } = props;

    const handleClick = useCallback(() => {
        onClick?.({ name, checked, text })
    }, [name, checked, text])

    return (
        <InputGroup.Text
            className={`checkbox-item no-text-select${checked ? ' checked' : ''}`}
            title={title}
            onClick={handleClick}
        >
            {text ?? name}
        </InputGroup.Text>
    )
}


export const CheckboxGroup = (props) => {

    const { items, text, onChange } = props;

    const checkboxItems = useMemo(() => {
        return items?.map(item => (
            <CheckboxItem
                key={item.id ?? item.name}
                onClick={onChange}
                {...item}
            />
        ))
    }, [items, onChange])

    return (
        <div>
            <Form.Label>{text}</Form.Label>
            <InputGroup className="checkbox-group">
                {checkboxItems}
            </InputGroup>
        </div>
    )
}