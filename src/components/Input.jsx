import React from 'react'

const Input = ({placeholder,type,onChange}) => {
  const element = type == 'textarea'? (<textarea type={type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  outline-none mb-2" placeholder={placeholder} onChange={onChange} cols="30" rows="5"/>  ):(<input type={type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  outline-none mb-2" placeholder={placeholder} onChange={onChange}/>  )
  return element;
    
}

export default Input