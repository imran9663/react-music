import React, { useEffect, useState } from 'react'
import './style.scss'
import { filterFromLanguage, nFormatter } from '../../../utils'
import { Icons } from '../../../assets/Icons'
import { useNavigate, useParams } from 'react-router'
import { getRequest } from '../../../apis/Base/serviceMethods'
import { configURL } from '../../../apis/Base/config'
import { Toaster, toast } from 'react-hot-toast'
const ArtistDetails = () => {
    const params = useParams();
    const [artist, setartist] = useState({
        details: {},
    })
    useEffect(() => {
        params.id !== '' && createArtistDetails(params.id)
    }, [])
    const navigate = useNavigate()

    const createArtistDetails = async (id) => {
        await getRequest(configURL.artist + `?id=${id}`)
            .then(res => {
                setartist({ ...artist, details: res.data.data })
            })
            .catch(errors => {
                toast.error("😥someting went wrog");
            })
    }
    useEffect(() => {
        filterFromLanguage(artist?.details?.availableLanguages)
    }, [artist?.details?.availableLanguages])

    return (
        <>
            <div className="artist_details container">
                <div className="countStatus my-2">
                    <div className=" col-6 followerCount ">
                        <h4 className="count">
                            {nFormatter(artist?.details?.fanCount, 1)} ❤
                        </h4>
                        <h4 className='follower'>
                            Listeners
                        </h4>
                    </div>
                    <div className="vertical-bar"></div>
                    <div className=" col-6 followerCount ">
                        <h4 className="count">
                            {nFormatter(artist?.details?.followerCount, 1)}+
                        </h4>
                        <h4 className='follower'>
                            followers
                        </h4>
                    </div>
                </div>
                <div className="languages ">
                    <h5 className='heading'>Languages</h5>
                    <div className="languages-list">
                        {
                            filterFromLanguage(artist.details.availableLanguages).map(item => {
                                return (
                                    <>
                                        <div key={item.name} className="languages-list-wrapper">
                                            <p className="languages-list-wrapper-item">
                                                {item.value?.split(' ')[0]}
                                            </p>
                                            {(item?.name?.toLowerCase() === artist?.details.dominantLanguage?.toLowerCase()) && < Icons.AiFillCrown />}
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="socialMedia">
                    {artist?.details?.fb !== '' && <div className="socialMedia-icon">
                        <a href={artist?.details?.fb} target="_blank" rel="noopener noreferrer">
                            <Icons.FaFacebookF />
                        </a>
                    </div>}
                    {
                        artist?.details?.twitter !== '' && <div className="socialMedia-icon">
                            <a href={artist?.details?.twitter} target="_blank" rel="noopener noreferrer">
                                <Icons.FaTwitter />
                            </a>
                        </div>
                    }

                    {artist?.details?.wiki !== '' && <div className="socialMedia-icon">
                        <a href={artist?.details?.wiki} target="_blank" rel="noopener noreferrer">
                            <Icons.FaWikipediaW />
                        </a>
                    </div>}
                </div>
            </div>
            <Toaster position='bottom' />
        </>

    )
}

export default ArtistDetails