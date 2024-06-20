import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { CheckboxGroup } from '../checkbox/CheckboxGroup';
import './style.scss';


export const IframeForm = (props) => {

    const {
        form,
        onChange,
        onClickGo,
        onQueryChange,
        onSubmit,
        query,
        children
    } = props;

    const [views, setViews] = useState([
        { name: 'topbar', checked: false },
        { name: 'sidebar', checked: false }
    ]);

    useEffect(() => {
        const event = {
            target: {
                name: 'hideviews',
                value: views.filter(({ checked }) => checked).map(({ name }) => name).join(',')
            }
        }
        onQueryChange?.(event)
    }, [views])

    const siteOptions = useMemo(() => {
        return appConfig.sites.map(({ url: value, name }) => ({
            value,
            name
        }));
    }, []);

    const pageOptions = useMemo(() => {
        return appConfig.pages.map(({ path: value, name }) => ({
            value,
            name: name || value
        }));
    }, []);

    const languageOptions = useMemo(() => {
        return appConfig.languages.map(({ id: value, name }) => ({
            value,
            name: `${name} (${value})`
        }));
    }, []);

    const onHideviewsChange = useCallback((checkbox) => {
        const { name, checked } = checkbox;
        setViews(prev => {
            const index = prev.findIndex(v => v.name === name);
            if (index === -1) return prev;
            let copy = [...prev];
            copy[index] = { ...copy[index], checked: !checked }
            return copy
        });
    }, []);

    return (
        <Card className="iframe-form" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Iframe form</Card.Title>
                <InputGroup>
                    <Button onClick={onClickGo}>Go!</Button>
                    <Form.Control
                        name="fullUrl"
                        onChange={onChange}
                        placeholder="Full URL https://unity..."
                    />
                </InputGroup>
                <Card.Text className="form-text">Or add parameters to iframe.</Card.Text>
                <Form.Label>Select site</Form.Label>
                <InputGroup>
                    <Button onClick={onSubmit}>Go!</Button>
                    <Select
                        items={siteOptions}
                        defaultValue={form?.baseUrl}
                        name="baseUrl"
                        onChange={onChange}
                    />
                </InputGroup>
                <Form.Label>Select page</Form.Label>
                <Select
                    name="page"
                    defaultValue={form?.page}
                    onChange={onChange}
                    items={pageOptions}
                />
                <Form.Label>URL queries</Form.Label>
                <InputGroup className="url-query-section">
                    <InputGroup.Text title='Azure active directory token'>sso</InputGroup.Text>
                    <Form.Control
                        name="sso"
                        onChange={onQueryChange}
                        value={decodeURIComponent(query?.sso ?? '')}
                        title={decodeURIComponent(query?.sso ?? '')}
                    />
                </InputGroup>
                <InputGroup className="url-query-section">
                    <InputGroup.Text title='Connect website token'>token</InputGroup.Text>
                    <Form.Control
                        name="token"
                        onChange={onQueryChange}
                        value={decodeURIComponent(query?.token ?? '')}
                        title={decodeURIComponent(query?.token ?? '')}
                    />
                </InputGroup>
                <InputGroup className="url-query-section">
                    <InputGroup.Text title="Example date format 2024-06-06T21:34:17+03:00">
                        expire
                    </InputGroup.Text>
                    <Form.Control
                        name="expire"
                        placeholder="token expire"
                        value={decodeURIComponent(query?.expire ?? '')}
                        title={decodeURIComponent(query?.expire ?? '')}
                        onChange={onQueryChange}
                    />
                </InputGroup>
                <InputGroup className="url-query-section">
                    <InputGroup.Text>langId</InputGroup.Text>
                    <Select
                        items={languageOptions}
                        defaultValue={query?.langId ?? languageOptions[0].value}
                        name="langId"
                        onChange={onQueryChange}
                    />
                </InputGroup>
                <InputGroup className="url-query-section">
                    <CheckboxGroup
                        text="hideviews"
                        items={views}
                        onChange={onHideviewsChange}
                    />
                </InputGroup>
            </Card.Body>
            {children}
        </Card>
    );
};

const Select = (props) => {
    const { items, ...rest } = props;

    const options = useMemo(() => {
        return items?.map((item) => (
            <option key={item.id ?? item.value} value={item.value}>
                {item.name ?? item.value}
            </option>
        ));
    }, [items]);

    return (
        <Form.Select aria-label="Default select example" {...rest}>
            {options}
        </Form.Select>
    );
};
