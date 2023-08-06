import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const EpisodeList = ({ datas, eps }) => {
    const [ getAnime, setAnime ] = useState([])
    useEffect(() => {
        let subscribe = false

        if(!subscribe){
            setAnime(datas)
        }

        return () => {
            subscribe = true
        }
    }, [datas])

    const List = () => {
        if(getAnime.length !== 0 ){
            return (
                <div className="p-3 bg-[#333] rounded my-3 text-white">
                    <h1 className="font-semibold text-center bg-primary p-2 rounded-lg">List Episode {getAnime.title}</h1>
                    <div className="max-h-[310px] w-full flex flex-col gap-3 my-5 overflow-auto">
                        {
                            Array.from({length: getAnime.episode}, (_, i) => 
                                <Link to={`/anime/${getAnime.slug}/${i+1}`}>
                                    <div className={`p-2 transition-all hover:bg-primary rounded-md bg-[#444] text-white `}>
                                        <p className="text-[15px]">{getAnime.title} Episode {i+1}</p>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            )
        }else{
            return (
                <>
                <div className="p-3 bg-white rounded my-5 animate-shimmer h-[330px]">
                </div>
                </>
            )
        }
    }
    return <List />
}