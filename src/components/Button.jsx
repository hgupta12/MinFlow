import React from 'react'

const Button = (props) => {
  const color = props.style == 'dark' ? 'bg-slate-950 focus:ring-slate-300 text-white':'bg-gray-400 focus:ring-slate-200 text-white'
  return (
    <button type={props.type} class={`${color} focus:outline-none focus:ring-4 font-medium ${!props.plain && 'rounded-full'} text-sm px-5 py-2.5 text-center mr-2 mb-2 ${props.full && 'w-full'} ${props.extraClasses}`} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button