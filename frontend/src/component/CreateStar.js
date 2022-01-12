import React, { useEffect, useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function CreateStar(props) {
    const [arr] = useState([1, 2, 3, 4, 5])
    return (
        <span>
            {arr.map((ele, index) =>
                ele <= props.star ?
                    <FaStar key={index} style={{ color: `rgb(250,240,0)` }} />
                    :
                    <FaRegStar key={index} style={{ color: `rgb(250,240,0)` }} />
            )}
        </span>
    )
}