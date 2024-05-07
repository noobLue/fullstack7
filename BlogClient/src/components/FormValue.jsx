import Form from 'react-bootstrap/Form'

const FormValue = ({ label, name, value, setValue, type }) => {
  const onChangeHelper = (func) => {
    return ({ target }) => {
      func(target.value)
    }
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type || 'text'} name={name} value={value} onChange={onChangeHelper(setValue)}></Form.Control>
    </Form.Group>
  )
}

export default FormValue
