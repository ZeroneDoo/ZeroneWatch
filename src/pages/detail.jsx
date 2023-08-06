import { useParams } from "react-router-dom"
import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import { DetailAnime } from "../components/detail/detailAnime"
import { EpisodeList } from "../components/detail/episodeList"
import { detailAnime } from "../network/api"

const Detail = () => {
    const { slug } = useParams()
    const [ getAnime, setAnime ] = useState([])
    document.title = getAnime.length !== 0 ? `${getAnime.title} - ZeroneWatch` : "ZeroneWatch"

    useEffect(() => {
        let subscribe = false
        
        detailAnime(slug).then(res => {
            if(!subscribe){
                setAnime(res)
            }
        })

        return () => {
            subscribe = true
        }
    }, [slug])
    
    return(
        <>
        <Navbar />
        {getAnime.length !== 0 ?
            <>
                <img src={getAnime.cover} alt="" loading="lazy" className="absolute -z-10 lg:h-[280px] md:h-[280px] h-[500px] w-full bg-contain object-cover"/>
                <div className="absolute -z-10 lg:h-[280px] md:h-[280px] h-[500px] w-full bg-contain object-cover backdrop-blur-lg"/>
            </>
        :
            null
        }

        <div className="mx-auto w-[80%] my-4 flex lg:flex-row md:flex-row flex-col lg:items-start md:items-start items-center gap-5">
            <div className="">
                {getAnime.length === 0 ?
                    <div className="w-[194px] h-[250px] bg-[#333] animate-shimmer">
                    </div>
                :
                    <img src={getAnime.cover} loading="lazy" alt={getAnime.cover} className=" w-[194px] object-cover bg-contain" />
                }
                {/* bottom image */}
                {getAnime.length !== 0 ?
                    <div className="bg-[#333] p-3 rounded-br rounded-bl lg:block md:block hidden">
                        <div className="max-w-[194px]">
                            <div className="mb-2">
                                <p className="text-[13px] font-bold text-white">Title</p>
                                <p className="text-[13px] text-[#999999]">{getAnime.title}</p>
                            </div>
                            <div className="mb-2">
                                <p className="text-[13px] font-bold text-white">Title Alternative</p>
                                <p className="text-[13px] text-[#888888]">{getAnime.titleAlt}</p>
                            </div>
                            <div className="mb-2">
                                <p className="text-[13px] font-bold text-white">Season</p>
                                <p className="text-[13px] text-gray">{getAnime.season}</p>
                            </div>
                        </div>
                    </div>
                :
                    null
                }
            </div>

            <div className="w-full">
                <DetailAnime  datas={getAnime}/>
                <EpisodeList  datas={getAnime}/>
            </div>
        </div>
        </>
    )
}

export default Detail