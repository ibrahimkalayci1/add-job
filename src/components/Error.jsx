import React from 'react'

const Error = ( {message, retry}) => {
  
  return (
    <div className='error'>
      <p>Üzgünüz Hata Oluştu</p>
      <p className='text'>{message} </p>

      <button onClick={retry} className='button'>
        <span>Tekrar Dene</span>

      </button>
    </div>
  )
}

export default Error