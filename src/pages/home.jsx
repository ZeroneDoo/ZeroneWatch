import { useEffect, useState } from "react"
import Content from "../components/home/content"
import HeroImage from "../components/home/heroImage"
import Navbar from "../components/navbar"
import { popularAnimes } from "../network/api"

const Home = () => {
    document.title= "ZeroneWatch"
    const [getAnimes, setAnimes] = useState([])
    
    useEffect(() => {
        let subscribe = false
        popularAnimes().then(res => {
            if(!subscribe){
                setAnimes(res)
            }
        })
        
        return () => {
            subscribe = true
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className="sm:w-5/6 mx-auto">
                <HeroImage datas={getAnimes}/>
                <Content datas={getAnimes}/>
            </div>
        </>
    )
}

export default Home