import React from 'react'

const BackButton = props => {
    return (
        <>
        <div className="back-bar">
        <i class="arrow alternate circle left large icon" onClick={()=> props.history.push(`${props.path}`)}></i>
        </div>
        </>
    )
}
export default BackButton