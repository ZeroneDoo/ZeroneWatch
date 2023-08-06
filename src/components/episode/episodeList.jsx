import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ListInEpisode = ({ datas, eps }) => {
    const [getAnime, setAnime] = useState([])
    eps = parseInt(eps)

    useEffect(() => {
        let subscribe = false

        if(datas){
            if(!subscribe){
                setAnime(datas)
            }
        }

        return () => {
            subscribe = true
        }
    }, [datas])

    return (
        <div className="p-3 bg-[#333] rounded text-white">
            <h1 className="font-semibold text-center bg-primary p-2 rounded-lg">List Episode {getAnime.title}</h1>
            <div className="max-h-[310px] w-full flex flex-col gap-3 my-5 overflow-auto">
                {getAnime.length !== 0 ?
                    Array.from({length: getAnime.episode}, (_, i) => 
                        <Link to={`/anime/${getAnime.slug}/${i+1}`}>
                            <div className={`p-2 transition-all hover:bg-primary rounded-md ${i+1 === eps ? 'bg-primary text-white':'bg-[#444] text-white' } `}>
                                <p className="text-[15px]">{getAnime.title} Episode {i+1}</p>
                            </div>
                        </Link>
                    )
                :
                    <img className="w-fit mx-auto h-[100px]" src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="loader" />
                }
            </div>
        </div>
    )
} 