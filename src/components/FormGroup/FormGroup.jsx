import Form from 'react-bootstrap/Form';

const FormGroup = ({ type, id, label, placeholder, required, items, rows, text, max, data, setData }) => {

    if (type === 'select') {
        return (
            <Form.Group className='mb-3' controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required ?
                    <Form.Select required value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })}>
                        {items.map((item, index) => <option value={item} key={index}>{item}</option>)}
                    </Form.Select> :
                    <Form.Select value={data[id]} onChange={(e) => setData({ ...data, id: e.target.value })}>
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
                {required
                    ? <Form.Control type={type} placeholder={placeholder} min="0" required value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />
                    : <Form.Control type="text" placeholder={placeholder} min="0" value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />}
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
                    checked={data[id] === item}
                    name='fuel'
                    required
                    onChange={(e) => setData({ ...data, [id]: e.target.value })}
                />)}
            </div>
        );
    }
    else if (type === 'textarea') {
        return (
            <Form.Group className="mb-3" controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required
                    ? <Form.Control as={type} rows={rows} placeholder={placeholder} maxLength={max} required value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />
                    : <Form.Control as={type} rows={rows} placeholder={placeholder} maxLength={max} value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />}
                <Form.Text id={id} muted>
                    {text}
                </Form.Text>
            </Form.Group>
        );
    }
    else {
        return (
            <Form.Group className='mb-3' controlId={id}>
                <Form.Label>{label}</Form.Label>
                {required
                    ? <Form.Control type="text" placeholder={placeholder} required value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />
                    : <Form.Control type="text" placeholder={placeholder} value={data[id]} onChange={(e) => setData({ ...data, [id]: e.target.value })} />}
            </Form.Group>
        );
    }
}

export default FormGroup; { }