import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { detailAnime } from '../../network/api';

const Content = ({ datas }) => {
    const [ getAnimes, setAnimes ] = useState([])

    useEffect(() => {
        let subscribe = false
        if(datas && datas.list){
            if(!subscribe){
                // get detail anime
                const fetchAnime = async () => {
                    const promises = datas.list.slice(0, 15).map((data) => 
                        detailAnime(data.slug)
                    )
    
                    const dataArray = await Promise.all(promises) 
    
                    setAnimes(dataArray)
                }
    
                fetchAnime()
            }
        }

        return () => {
            subscribe = true
        }
    }, [datas])

    const PopularAnimes = () => {
        if(getAnimes.length > 0) {
            return getAnimes.map((anime, i) => 
                <Link to={`/anime/${anime.slug}`} key={i}>
                    <div className="px-4 w-full box-border overflow-hidden">
                        <img src={anime.cover} alt={anime.cover} key={i} className="w-full lg:h-[251px] md:h-[288px] h-[214px] bg-black animate-shimmer object-cover bg-contain"></img>
                        <p className="mt-1 mb-2 line-clamp-2">{anime.title}</p>
                    </div>
                </Link>
            )
        }else {
            return Array.from({length: 10}, (_, i)=> 
                <div className="px-4 w-full box-border overflow-hidden">
                    <div key={i} className="w-full lg:h-[251px] md:h-[288px] h-[224px] bg-black animate-shimmer object-cover bg-contain mb-4"></div>
                </div>
            )
        }
    }
    
    return (
        <div className="mt-14 mb-5">
            <div className="bg-primary w-full h-[45px] rounded-tl rounded-tr flex items-end">
                <div className="bg-card-dark text-white px-5 py-1 rounded-tl rounded-tr w-fit text-[14px] font-bold ml-4">
                    <p>Popular Today</p>
                </div>
            </div>
            <div className="rounded-br rounded-bl p-3 text-white bg-card-dark">
                {/* card */}
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                    <PopularAnimes />
                </div>
                {/* end card */}
                <div className="flex justify-end items-center gap-5 text-[14px] my-4">
                    <button className="hover:text-primary active:text-primary rounded-md select-none font-bold px-3 py-1 flex items-center gap-2"><FontAwesomeIcon icon={faChevronLeft} /> Previous</button>
                    <p className='font-bold'>Page ...</p>
                    <button className=' hover:text-primary active:text-primary rounded-md select-none font-bold px-3 py-1 flex items-center gap-2'>Next <FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
        </div>
    )
}

export default Content