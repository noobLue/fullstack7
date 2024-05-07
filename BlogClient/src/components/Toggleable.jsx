import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = forwardRef(({ children, startVisible, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(startVisible)

  const toggleVisibility = (v) => {
    setVisible(v)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={{ display: visible ? '' : 'none' }}>
        {children}
        <Button variant="secondary" onClick={() => toggleVisibility(false)}>
          cancel
        </Button>
      </div>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button variant="secondary" onClick={() => toggleVisibility(true)}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
