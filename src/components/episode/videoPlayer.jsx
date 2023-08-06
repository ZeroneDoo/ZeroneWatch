import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

export const VideoPlayer = ({ datas, anime, eps }) => {
    const [getEpisode, setEpisode] = useState([])
    const [getAnime, setAnime] = useState([])
    const [resolution, setResolution] = useState("360p")
    const [source, setSource] = useState("")
    const videoPlayer = useRef(null)
 
    // for handle anime and episodes 
    useEffect(() => {
        let subscribe = false

        if(datas) {
            if(!subscribe){
                setEpisode(datas)
            }
            if(!subscribe){
                setAnime(anime)
            }
        }

        return () => {
            subscribe = true
        }
    }, [datas, anime])

    // for handle resolution source video
    useEffect(() => {
        let subscribe = false
        if (getEpisode.length !== 0) {
            const url = getEpisode.video.find((res) => res.quality === resolution)?.url;
            if(!subscribe){
                setSource(url);
            }
        }
        
        return () => {
            subscribe = true
        }
    }, [getEpisode, resolution]);

    // automatic play video
    useEffect(() => {
        if(videoPlayer.current){
            if(videoPlayer.current.canPlayType("video/mp4")){
                videoPlayer.current.addEventListener("canplay", () => {
                    videoPlayer.current.play()
                })
            }
        }
    }, [source])
    
    const handleResolution = (value) => {
        if(getEpisode.length !== 0) setResolution(value) 
    }
    
    if(getEpisode.length !== 0 && getAnime.length !== 0){
        return (
            <>
                <video className="w-full" id="video-player" controls ref={videoPlayer} src={source} muted></video>
                <div className="mt-4">
                    <div className="p-2 bg-primary text-[14px]">
                        <p className="text-white font-semibold text-[14px]">Resolution Video</p> 
                    </div>
                    <div className="bg-[#333] p-3 text-white">
                        <select id="resolution-select" className="w-full p-2 rounded-md bg-[#444]" onChange={(e) => handleResolution(e.target.value)}>
                            {
                                getEpisode.video.map(res =>
                                    <option value={res.quality} selected={res.quality === resolution ? true : false}>{res.quality}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="my-4">
                    <div className="p-2 bg-primary">
                        <p className="text-white font-semibold text-[14px]">Download Video {getAnime.title} Episode {eps}</p>
                    </div>
                    <div className="bg-[#333] p-3 text-white">
                        <table cellPadding={`6`}>
                            {
                                getEpisode.video.map((video, i) => 
                                    <tr key={i}>
                                        <td>
                                            <p className="px-3 py-1 rounded-lg bg-primary w-full text-[13px] text-center">{video.quality}</p>
                                        </td>
                                        <td>
                                            <Link to={video.url} className="px-3 active:text-primary underline rounded-lg w-full text-[13px] text-center">Link Download</Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                </div>
            </>
        )
    }else{
        return (
            <>
                <video className="w-full" controls src=""></video>
                <div className="my-4">
                    <div className="p-2 bg-primary">
                        <p className="text-white font-semibold text-[14px]">Download Video</p>
                    </div>
                    <div className="bg-[#333] p-3 text-white">
                        <img className="w-fit mx-auto h-[100px]" src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="loader" />
                    </div>
                </div>
            </>
        )
    }
}