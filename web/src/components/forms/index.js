import { h, Component } from 'preact';
import style from './style'

export function Field({
  label,
  type,
  value,
  children,
  onChange
}) {
  return (
    <label className={ style.label }>
      <span>{ label }</span>
      <input type={ type } value={ value } onInput={ onChange } />
      { children }
    </label>
  )
}

export function Choice({
  label,
  value,
  children,
  onChange
}) {
  return (
    <label className={ style.label }>
      <span>{ label }</span>
      <select value={ value } onChange={ onChange }>
        { children }
      </select>
    </label>
  )
}

export function Button({
  children,
  onClick
}) {
  return (
    <button className={ style.button } onClick={ onClick }>
      { children }
    </button>
  )
}

export function FormGroup({
  label,
  children
}) {
  return (
    <fieldset className={ style.fieldset }>
      <legend>{ label }</legend>
      { children }
    </fieldset>
  )
}