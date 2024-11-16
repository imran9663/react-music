import React from 'react'
import './style.scss'
import BannerLoader from '../BannerLoader'
import SongStripeLoader from '../SongStripeLoader'
import SlideLoader from '../SlideLoader'
const SearchingLoader = () => {
    return (
        <div className="my-2">
            <BannerLoader />
            <br />
            <SlideLoader />
            <br />
            <br />
            <SongStripeLoader />
            <SongStripeLoader />
            <SongStripeLoader />
            <SongStripeLoader />
        </div>
    )
}

export default SearchingLoader