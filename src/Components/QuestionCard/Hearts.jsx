import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Hearts = (props) => {
    let heartsArray = Array.from({length: props.hearts}, (v, i) => i);
    return (
        <div style={{display: "flex", alignItems: "flex-end"}}>
            {heartsArray.map((i) => (
                <FavoriteIcon key={i} color="primary" fontSize="large" style={{marginLeft:"2px"}}/> 
            ))}
        </div>
    )
}

