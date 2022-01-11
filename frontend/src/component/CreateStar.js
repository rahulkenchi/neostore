import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function CreateStar(props) {
    const [arr] = useState([1, 2, 3, 4, 5])
    return (
        <div className='d-flex justify-content-center'>
            {arr.map((ele) =>
                <FaStar style={{ color: ele > props.star ? `rgb(255,255,255)` : `rgb(250,240,0)` }} />
            )}
        </div>
    )
}
