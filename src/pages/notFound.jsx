import Navbar from "../components/navbar"

export const NotFound = () => {
    document.title ="404 Not Found - ZeroneWatch"
    return(
        <>
            <Navbar />
            <div className="w-fit h-fit mt-20 mb-10 mx-auto">
                <img src="https://kiryuu.id/wp-content/themes/mangareader/assets/images/404.png" alt="" className="bg-contain w-[400px] h-[300px]" />
            </div>
        </>
    )
}