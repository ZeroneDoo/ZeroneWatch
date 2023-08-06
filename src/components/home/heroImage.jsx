import { useEffect, useState } from "react"
import Slider from "react-slick"
import { Link } from "react-router-dom"
import { detailAnime } from "../../network/api"

const HeroImage = ({ datas }) => {
    const [ getAnimes, setAnimes ] = useState([])
    useEffect(() => {
        let subscribe = false

        if(datas && datas.list){
            if(!subscribe){
                const fetchAnime = async () => {
                    const promises = datas.list.slice(0, 4).map((data) => 
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

    const settings = {
        dots: true,
        Infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    }

    const HeroImages = () => {
        if(getAnimes.length > 0){
            return <Slider {...settings}>
                {
                    getAnimes.map((anime, i) => 
                        <div  key={i}>
                            <div className="bg-contain object-cover h-[270px] sm:h-[350px] w-full sm:mt-8 mb-3 overflow-hidden relative" style={{backgroundImage: `url('${anime.cover}')` }}>
                                {/* bg */}
                                <div className="absolute top-0 left-0 bg-black/90 w-screen h-screen  backdrop-blur-sm">
                                </div>
                                {/* close bg */}
                                {/* detail */}
                                <div className="relative mx-7 flex items-center h-[270px] sm:h-[350px]">
                                    <div className="flex items-center gap-5 w-full">
                                        <Link to={`/anime/${anime.slug}`} className="select-none">
                                            <img src={anime.cover} alt={anime.cover} className="lg:w-[196px] md:w-[240px] w-[150px] lg:h-[268px] md:h-[268px] h-[148px] object-cover bg-cover"/>
                                        </Link>

                                        <div className="w-fit h-fit">
                                            <Link to={`/anime/${anime.slug}`} className="select-none">
                                                <h1 className="text-white font-bold lg:text-[28px] md:text-[26px] text-[19px] max-h-[70px] line-clamp-2">{anime.title}</h1>
                                                <p className="text-white lg:text-[14px] md:text-[14px] text-[12px] max-h-[70px] line-clamp-2">{anime.synopsis.split("Catatan:")[0]}</p>
                                            </Link>
                                            <div className="lg:max-w-[620px] md:max-w-[510px] max-w-[300px]">
                                                {
                                                    anime.genre.map((genre, i) => 
                                                        <Link to={`/genre/${genre.replace(' ', '-').toLowerCase()}`} className="select-none mt-1 w-fit inline-block mr-1" key={i}>
                                                            <p className="px-3 py-1 rounded-md font-semibold text-white bg-primary w-fit text-[11px]">{genre}</p>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* close detail */}
                            </div>
                        </div>
                    )
                }
            </Slider>
        }else{
            return <Slider {...settings}>
                {
                    Array.from({length: 4}, (_, i)=> {
                        return (
                            <div className="w-full sm:mt-8 mb-3 h-fit overflow-hidden relative" key={i}>
                                <div className="h-[270px] sm:h-[350px] w-full bg-gray-300 animate-shimmer"></div>
                            </div>
                        )
                    })
                }
            </Slider>
        }
    }

    return <HeroImages />
}

export default HeroImage