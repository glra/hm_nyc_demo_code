import React from "react"
import { useNavigate } from "react-router-dom"
import "./Button.css"

function Button({ text, target, modifier }) {
  let navigate = useNavigate()
  const gotoRoute = () => {
    navigate(target)
  }

  // const buttonModifierClass = modifier ? ` Button__${modifier}` : ''
  // replaces line 15
  // <button className={'Button' + modifier} onClick={gotoRoute}>

  return (
    <button className={"button button--" + modifier} onClick={gotoRoute}>
      {text} >>
    </button>
  )
}

export default Button
