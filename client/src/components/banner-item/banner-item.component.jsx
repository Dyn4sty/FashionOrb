import React from 'react'
import { BannerWrapper } from './banner-item.styles'

const BannerItem = ({background, children, bannerheight, ...rest}) => {
    return (
        <BannerWrapper {...{background, bannerheight, ...rest}}>
            <div className="bannerItem">
                <div className="container">
                   {children}
                </div>
            </div>
        </BannerWrapper>
        
    )
}

export default BannerItem