import { useEffect, useState } from "react"
import { detailAnime, detailEpisode } from "../network/api"
import { useParams } from "react-router-dom"
import Navbar from "../components/navbar"
import { ListInEpisode } from "../components/episode/episodeList"
import { VideoPlayer } from "../components/episode/videoPlayer"

export const Episode = () => {
    const { slug, eps } = useParams()
    const [getAnime, setAnime] = useState([])
    const [getEpisode, setEpisode] = useState([])
    document.title =getAnime.length !== 0 ? `${getAnime.title} Episode ${eps} - ZeroneWatch` : "ZeroneWatch" 

    useEffect(() => {
        let subscribe = false
        
        detailAnime(slug)
        .then(res => {
            if(!subscribe){
                setAnime(res)
            }
        })

        detailEpisode(slug, eps)
        .then(res => {
            if(!subscribe){
                setEpisode(res)
            }
        })

        return () => {
            subscribe = true
        }
    }, [slug, eps])
    
    return (
        <>
            <Navbar />
            <div className="lg:w-11/12 md:w-11/12 w-full flex items-start lg:flex-row md:flex-row flex-col gap-5 mx-auto lg:my-5 md:my-5 mb-5">
                <div className="lg:w-3/4 w-full">
                    <VideoPlayer datas={getEpisode} anime={getAnime} eps={eps}/>
                </div>
                <div className="lg:w-1/2 md:w-1/2 w-full">
                    <ListInEpisode datas={getAnime} eps={eps}/>
                </div>
            </div>
        </>
    )
}