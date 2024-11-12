import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import SongStrip from '../../../components/SongStrip'
import { getRequest } from '../../../apis/Base/serviceMethods'
import { configURL } from '../../../apis/Base/config'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'
import SpotLoader from '../../../components/Loader/SpotLoader'
import { Icons } from '../../../assets/Icons'
import MediaCard from '../../../components/MediaCard'
const ArtistSongs = () => {
    const [isLoading, setisLoading] = useState(false)
    const [songs, setsongs] = useState({
        lastPage: false,
        results: [],
        total: 0
    })
    const [page, setpage] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        params.id !== '' && createArtistDetails(params.id)
    }, [page])
    const createArtistDetails = async (id) => {
        if (songs.lastPage) {
            return
        } else {
            setisLoading(true)
            await getRequest(configURL.artist + `/${id}/songs?page=${page}`)
                .then(res => {
                    if (songs?.results?.length > 1) {
                        setsongs({
                            ...songs,
                            lastPage: res.data.data.lastPage,
                            results: [...songs.results, ...res.data.data.results],
                            total: res.data.data.total,
                        })
                    } else {
                        setsongs({
                            ...songs,
                            lastPage: res.data.data.lastPage,
                            results: res.data.data.results,
                            total: res.data.data.total,
                        })
                    }
                })
                .catch(errors => {
                    toast.error("😥someting went wrog");
                }).finally(() => {
                    setisLoading(false)
                })
        }
    }
    const onScrollHandler = (event) => {
        if (parseInt(event.target.scrollTop) > parseInt(event.target.scrollHeight / 2)) {
            setTimeout(() => {
                setpage(page + 1)
            }, 1000);
        }

    };
    return (
        <>
            <div onScroll={onScrollHandler} className="songlist artist-list">
                <div className="songlist mx-3">
                    {songs?.results?.map((item, ind) => {
                        return (
                            <>
                                <SongStrip key={ind} data={item} />
                            </>
                        )
                    })}
                    {isLoading &&
                        <div className="w-100 d-flex justify-content-center align-items-center  my-5">
                            <SpotLoader />
                        </div>

                    }
                    {songs.lastPage && <>
                        <div className="w-100 d-flex justify-content-center align-items-center  my-5">
                            <button onClick={() => { navigate(-1) }} className="btn go-back-btn">
                                <Icons.BsArrowLeft /> Go back
                            </button>
                        </div>

                    </>}
                </div>
            </div>
            <Toaster position='bottom' /></>
    )
}

export default ArtistSongs