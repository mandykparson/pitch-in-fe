import React from 'react'

export default function Homepage(props) {
    return (
        <div className="container">
            <h4>Welcome Back, {props.user.username}</h4>
        </div>
    )
}
