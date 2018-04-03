import React from 'react'

export default ({flags,toggle})=>{
    return(
        <div className='top-bar'>
            <h1 className='top-bar__header'>Flags Quiz</h1>
            <p className='question-mark' onClick={toggle}></p>
            <ul className='top-bar__flags'>
                {flags.map(flag => <li className='top-bar__single-flag' key={flag} style={{backgroundImage: `url(${flag})`}}></li>)}
            </ul>
        </div>
    )
}