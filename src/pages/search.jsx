import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { detailAnime, searchAnime } from "../network/api";
import { Link } from "react-router-dom";

export const Search = () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('query');
    const [getAnimes, setAnimes] = useState([])
    document.title ="Search - ZeroneWatch"
    
    useEffect(() => {
        let subscribe = false

        searchAnime(key).then(res => {
            if(!subscribe) {
                const fetchAnime = async () => {
                    const promises = res.list.map(anime => detailAnime(anime.slug))

                    const dataArray = await Promise.all(promises)

                    setAnimes(dataArray)
                }

                if(key !== ""){
                    fetchAnime()
                }
            }
        })

        return () => {
            subscribe = true
        }
    }, [key])
    
    const SearchResults = () =>{
        if(getAnimes.length !== 0){
            return getAnimes.map( anime =>
                <Link to={`/anime/${anime.slug}`}>
                    <div className="p-1 w-fit">
                        <div className="px-4 w-full box-border overflow-hidden">
                            <img src={anime.cover} alt="" loading="lazy" className="w-[194px] lg:h-[251px] md:h-[288px] h-[214px] bg-black animate-shimmer object-cover bg-contain"/>
                            <p className="mt-1 mb-2 line-clamp-2">{anime.title}</p>
                        </div>
                    </div>
                </Link>
            )
        }

        return <img className="w-fit mx-auto h-[200px]" src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="loader" />
        
    }

    return (
        <>
        <Navbar />
        <div className="my-14 p-3 mx-auto w-11/12 rounded bg-[#333] text-white">
            <div className="bg-primary p-2 rounded-md">
                <h1 className="text-[16px] font-bold ">Search '{key}'</h1>
            </div>
            <hr className="my-3 text-[#f1f1f1]"/>
            {getAnimes.length !== 0 ?
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto">
                    <SearchResults />
                </div>
            :
                <div className="">
                    <SearchResults />
                </div>
            }
        </div>
        </>
    )
}