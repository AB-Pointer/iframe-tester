import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './style.scss';


export const QueryDialog = (props) => {

    const {
        onSave,
    } = props;

    const [show, setShow] = useState(false);
    const [query, setQuery] = useState({ name: '', value: '' });

    const handleClose = useCallback(() => {
        setShow(false);
    }, []);

    const handleShow = useCallback(() => {
        setShow(true);
    }, []);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setQuery(prev => ({ ...prev, [name]: value }))
    }, []);


    const handleSave = useCallback(() => {
        onSave?.(query);
        setQuery({ name: '', value: '' });
        handleClose();
    }, [query, handleClose, setQuery]);

    const handleCancel = useCallback(() => {
        setQuery({ name: '', value: '' });
        handleClose();
    }, [setQuery, handleClose]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose} className='query-dialog'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Query</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="url-query-section">
                        <InputGroup.Text title='Edit query name'>Name</InputGroup.Text>
                        <Form.Control
                            name="name"
                            onChange={onChange}
                            value={query.name}
                        />
                    </InputGroup>
                    <InputGroup className="url-query-section">
                        <InputGroup.Text title='Edit query value'>Value</InputGroup.Text>
                        <Form.Control
                            name="value"
                            onChange={onChange}
                            value={query.value}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={!query.name}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
