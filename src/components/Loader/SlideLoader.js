import React from 'react'
import './style.scss'
import Slider from 'react-slick';
const SlideLoader = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <>
            <Slider {...settings}>
                <span className="slideloader" />
                <span className="slideloader" />
                <span className="slideloader" />
                <span className="slideloader" />
                <span className="slideloader" />
                <span className="slideloader" />
                <span className="slideloader" />

            </Slider>
        </>
    )
}

export default SlideLoader