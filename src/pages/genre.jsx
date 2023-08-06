import { useEffect, useState } from "react";
import { detailAnime, detailGenre, genres } from "../network/api";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export const Genre = () => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('query');
    const [getGenre, setGenre] = useState([])
    const [getAnimes, setAnimes] = useState([])
    document.title ="Genre - ZeroneWatch"

    useEffect(() => {
        let subscribe = false

        genres().then(res => {
            if(!subscribe){
                setGenre(res)
            }
        })

        if(key){
            detailGenre(key).then(res => {
                if(!subscribe) {
                    const fetchAnime = async () => {
                        const promises = res.list.map(anime => detailAnime(anime.slug))
    
                        const dataArray = await Promise.all(promises)
    
                        setAnimes(dataArray)
                    }
    
                    fetchAnime()
                }
            })

        }

        return () => {
            subscribe = true
        }
        
    }, [key])

    const GenreList = () =>{
        if(getGenre.length !== 0){
            return (
                getGenre.map((genre, i) => 
                    <a href={`/genre?query=${genre.slug}`} key={i} className={`px-3 m-1 py-1 inline-block border border-primary rounded ${genre.slug === key ? 'bg-primary' : ''} hover:bg-primary transition-all`}>{genre.title}</a>
                )
            )
        }

        return <img className="w-fit mx-auto h-[200px]" src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="loader" />
    }

    const AnimeList = () => {
        if(getAnimes.length !== 0) {
            return getAnimes.map((anime, i) => 
                <Link to={`/anime/${anime.slug}`} key={i}>
                    <div className="px-4 w-full box-border overflow-hidden">
                        <img src={anime.cover} alt={anime.cover} key={i} className="w-full lg:h-[251px] md:h-[288px] h-[214px] bg-black animate-shimmer object-cover bg-contain"></img>
                        <p className="mt-1 mb-2 line-clamp-2">{anime.title}</p>
                    </div>
                </Link>
            )
        }

        return <img className="w-fit mx-auto h-[200px]" src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="loader" />
    }
 
    return (
        <>
        <Navbar />
        <div className="my-14 mx-auto w-11/12 rounded ">
            <div className="w-full bg-[#333] text-white rounded p-3">
                <div className="bg-primary p-2 rounded-md">
                    <h1 className="text-[16px] font-bold ">All Genre</h1>
                </div>
                <hr className="my-3 text-[#888888]"/>
                <div className="w-full">
                    <GenreList />
                </div>
            </div>

            {key ?
                <div className="my-6 bg-[#333] text-white">
                    <div className="bg-primary w-full h-[45px] rounded-tl rounded-tr flex items-end">
                        <div className="bg-card-dark text-white px-5 py-1 rounded-tl rounded-tr w-fit text-[14px] font-bold ml-4">
                            <p>Anime List</p>
                        </div>
                    </div>
                    <div className="rounded-br rounded-bl p-3 text-white bg-card-dark">
                        {/* card */}
                        { getAnimes.length !== 0 ?
                            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                                <AnimeList />
                            </div>
                        :
                            <div className="">
                                <AnimeList />
                            </div>
                        }
                        {/* end card */}
                    </div>
                </div>
            :
                null
            }
        </div>
        </>
    )
}