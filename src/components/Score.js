import React from 'react';

export default ({firstParam,secondParam})=>{
    return(
        <div className='score-wrapper'>
            <p className='score-item'>round: {firstParam}</p>
            <p className='score-item'>score: {secondParam}</p>
        </div>
    )
}