import React from 'react'


const Item = props => {
    console.log(props);
    return (
        <p>{props.item.name} </p>
    )
}
export default Item