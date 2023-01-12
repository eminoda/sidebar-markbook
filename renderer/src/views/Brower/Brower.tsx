import React from 'react'
import "./Brower.less"

const Brower = (props: {}) => {
    return <div className="brower">
        <iframe src="https://www.bing.com" className="brower-iframe"></iframe>
    </div>
}
export default Brower