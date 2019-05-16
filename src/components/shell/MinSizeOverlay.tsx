import * as React from 'react'

import './css/MinSizeOverlay.css'

export function MinSizeOverlay() {
    return (
        <div className='MinSizeOverlay'>
            <h1>
                Welcome to Course Links!
            </h1>
            <h3>
                Your window size is too small. <br />
                Please increase the window size or zoom out. <br /> <br />
                CourseLinks requires a widescreen display and <br />
                does not support mobile devices at this time.
            </h3>
        </div>
    )
}