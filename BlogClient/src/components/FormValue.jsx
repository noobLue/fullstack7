const FormValue = ({ label, name, value, setValue }) => {
  const onChangeHelper = (func) => {
    return ({ target }) => {
      func(target.value)
    }
  }

  return (
    <div>
      {label} <input type="text" name={name} value={value} onChange={onChangeHelper(setValue)}></input>
    </div>
  )
}

export default FormValue
