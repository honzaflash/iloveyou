import { useState } from "react"
import "./Authorize.css"

export const Authorize = (props) => {
  const { setAuthorized } = props

  const [nameField, setNameField] = useState("")
  const [formStatus, setFormStatus] = useState("")

  const handleChange = (event) => {
    setNameField(event.target.value)
  }

  const handleSubmit = () => {
    if (nameField === "Clarissa") {
      setFormStatus("Correct! Welcome boop!")
      setAuthorized(true)
    } else {
      setFormStatus(`"${nameField}" is not the right person`)
    }
  }

  return (
    <div className="Authorize">
      <h3>Who are you? 🤔</h3>
      <label>
        <input type="text" value={nameField} onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <div className="status">{formStatus}</div>
    </div>
  )
}
