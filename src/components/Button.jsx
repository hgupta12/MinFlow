import React from 'react'

const Button = (props) => {
  const color = props.type == 'dark' ? 'bg-slate-950 focus:ring-slate-300 text-white':'bg-gray-400 focus:ring-slate-200 text-white'
  return (
    <button type="button" class={`${color} focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2`} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button