import { Typography } from '@material-ui/core'
import React from 'react'
import notFound from "../../Assets/notFound.jpg"

const PageNotFound = () => {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img style={{maxWidth:'90%',maxHeight:'80vh'}} src={notFound} />
        </div>
    )
}

export default PageNotFound