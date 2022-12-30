import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './style.scss';
import RouteStrings from '../../utils/RouteStrings'
import { useNavigate } from 'react-router';
import { ParseString } from '../../utils';
import { Icons } from '../../assets/Icons';
const MusicSlider = (props) => {
  const navigate = useNavigate()
  const { data, isSquare } = props
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
  const handleClick = (obj) => {
    console.log("handleClick", obj.type);
    obj.type === 'playlist' && navigate(RouteStrings.playlist + obj.id);
    obj.type === 'album' && navigate(RouteStrings.albums + obj.id);
    obj.type === 'song' && navigate(RouteStrings.song + obj.id);
  }
  return (
    <>
      <Slider {...settings}>
        {data.length > 0 &&
          data.map((item, ind) => {
            return (
              <>
                <div key={ind}>
                  <button onClick={() => handleClick(item)} className={isSquare ? 'newCard isSquare' : 'newCard '}>
                    <img onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = Icons.defualtImage;
                    }} src={item?.image[2].link} alt="album art" className="newCard-image" />
                    {<div className="newCard-overlay">
                      {item.songCount !== "" && Number(item.songCount) > 1 &&
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light newCard-overlay-badge">
                          <Icons.BsMusicNote />{Number(item.songCount) > 9 ? '9+' : item.songCount}
                        </span>
                      }

                      <p className="newCard-overlay-name">
                        {item.name ? ParseString(item.name) : ParseString(item.title)}
                      </p>
                      <div className="newCard-overlay-info">
                        {
                          item?.artists && item?.artists.length > 0 &&
                          <p key={item.artists[0].id} className="newCard-overlay-info-artist">
                            {ParseString(item?.artists[0].name)}
                          </p>
                        }
                        {item?.artists && item?.artists.length > 1 &&
                          <p className="newCard-overlay-info-artist">
                            +{item?.artists.length - 1}
                          </p>
                        }
                      </div>
                    </div>}
                  </button>
                </div>
              </>
            )
          })
        }
      </Slider>
    </>
  )
}

export default MusicSlider