import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const DetailAnime = ({ datas }) => {

    const [getAnime, setAnime ] = useState([])

    useEffect(() => {
        let subscribe = false
        
        if(!subscribe){
            setAnime(datas)
        }

        return () => {
            subscribe = true
        }
    }, [datas])

    const Detail = () => {
        if(getAnime.length !== 0){
            return <div className="w-full">
                <div className="py-3 px-4 bg-black/30 text-white rounded">  
                    <h1 className="text-[22px] font-bold">{getAnime.title}</h1>
                    <div className="flex lg:items-left mg:items-left items-center lg:flex-row md:flex-row flex-col gap-4 my-3">
                        <div className="w-full">
                            {/* genres */}
                            <div className="w-full text-[14px] text-primary font-bold">
                                {
                                    getAnime.genre.map(genre => {
                                        return (
                                            <Link to={`/genre?query=${genre.replace(' ','-').toLowerCase()}`} className="px-3 m-1 py-1 inline-block border border-primary rounded hover:text-white hover:bg-primary transition-all">
                                                {genre}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            {/* end genres */}
                        </div>
                    </div>
                    <p className="text-[14px] line-clamp-4">{getAnime.synopsis.split("Catatan:")[0]}</p>
                </div>
                {/* detail on mobile */}
                <div className="bg-[#333] mt-5 p-3 rounded-sm lg:hidden md:hidden block">
                    <div className="max-w-[194px]">
                        <div className="mb-2">
                            <p className="text-[13px] font-bold text-white">Title</p>
                            <p className="text-[13px] text-[#999999]">{getAnime.title}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-[13px] font-bold text-white">Title Alternative</p>
                            <p className="text-[13px] text-[#999999]">{getAnime.titleAlt}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-[13px] font-bold text-white">Season</p>
                            <p className="text-[13px] text-[#999999]">{getAnime.season}</p>
                        </div>
                    </div>
                </div>
                {/* end detail on mobile */}
            </div>
        }else{
            return (
                <div className="w-full">
                    <div className="py-3 px-4 bg-black/30 text-white rounded h-[150px] animate-shimmer">  
                    </div>
                    {/* detail on mobile */}
                    <div className="bg-[#333] h-[230px] mt-5 p-3 rounded-sm lg:hidden md:hidden block animate-shimmer">
                    </div>
                    {/* end detail on mobile */}
                </div>
            )
        }
    }

    return (
        <Detail />
    )
}