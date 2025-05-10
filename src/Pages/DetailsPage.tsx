import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchDetailsShows } from "../features/shows/showWhitIdSlice"
import type { AppDispatch, RootState } from "../app/store"
import { FaArrowLeftLong } from "react-icons/fa6";
import { controlFavorites } from "../features/favorites/favoritesSlice"
import { FaHeart } from "react-icons/fa";
import type { Show } from "../model/Show"


const DetailsPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const details : Show = useSelector((state: RootState) => state.details.show)
    const favorites = useSelector((state: RootState) => state.favorites.favorites)


    console.log(typeof (id))
    console.log(details)
    useEffect(() => {
        dispatch(fetchDetailsShows(id))
    }, [id, dispatch])

    const favoritesControll = () => {
        dispatch(controlFavorites(details))
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-6 p-6">
                <div className="absolute top-6 left-6" >
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
                        <FaArrowLeftLong />
                        Geri Dön
                    </button>
                </div>
                <div className="flex-shrink-0 my-10">
                    <img src={details?.image?.medium} alt={details?.name} className="w-64 h-auto rounded-md" />
                </div>
                <div className="space-y-2 my-10">
                    <p className="text-2xl font-bold">{details?.name}</p>
                    <p><span className="font-semibold">Türler:</span> {details?.genres?.join(', ')}</p>
                    <p><span className="font-semibold">Dil:</span> {details?.language}</p>
                    <p className="prose max-w-none" dangerouslySetInnerHTML={{ __html: details?.summary }}></p>
                    <p><span className="font-semibold">Rating:</span> {details?.rating?.average ?? "--"}</p>
                    <button onClick={() => favoritesControll()} className={favorites.find(item => item.id == Number(id)) ? "text-red-500 hover:text-gray-500 transition-colors" : "text-gray-500 hover:text-red-500 transition-colors"}>
                        <FaHeart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailsPage
