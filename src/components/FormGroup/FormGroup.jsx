import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormGroup = ({ type, id, label, placeholder, required, items }) => {

    const s = 'lg{8}'

    if (type === 'select') {
        return (
            <Form.Group className='mb-3' controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required ?
                    <Form.Select required>
                        {items.map((item, index) => <option value={item} key={index}>{item}</option>)}
                    </Form.Select> :
                    <Form.Select>
                        {items.map((item, index) => <option value={item} key={index}>{item}</option>)}
                    </Form.Select>
                }
            </Form.Group>
        );
    }
    else if (type === 'number') {
        return (
            <Form.Group className='mb-3' controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required ? <Form.Control type={type} placeholder={placeholder} min="0" required /> : <Form.Control type="text" placeholder={placeholder} min="0" />}
            </Form.Group>
        );
    }
    else if (type === 'radio') {
        return (
            <div className='mb-3'>
                <h5>{label}</h5>
                {items.map((item, index) => <Form.Check
                    inline
                    key={index}
                    label={item}
                    type={type}
                    value={item}
                    id={item}
                    name='fuel'
                    required
                />)}
            </div>
        );
    }
    else {
        return (
            <Form.Group className='mb-3' controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required ? <Form.Control type="text" placeholder={placeholder} required /> : <Form.Control type="text" placeholder={placeholder} />}
            </Form.Group>
        );
    }
}

export default FormGroup; { }