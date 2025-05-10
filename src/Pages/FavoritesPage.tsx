import { useSelector } from "react-redux"
import type { RootState } from "../app/store"
import Show from "../Components/Show"
import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6"

const FavoritesPage = () => {
    const favs = useSelector((state: RootState) => state.favorites.favorites)
    const navigate = useNavigate()
    return (
        <>
            {favs.length > 0
                ? (
                    <div>
                        <div className="w-full py-4 mt-4 bg-gray-700 text-center">
                            <p className="text-2xl font-semibold text-white">Favori Showların</p>
                        </div>
                        <div className="absolute top-9 left-6" >
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-amber-50 hover:text-amber-50 font-semibold"
                            >
                                <FaArrowLeftLong />
                                Geri Dön
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-evenly gap-4 mt-4">
                            {favs.map((show, index) => (
                                <Show key={index} show={show} />
                            ))}
                        </div>
                    </div>
                )
                : (
                    <div>
                        <div className=" w-full py-4 mt-4 bg-gray-700 text-center">
                            <p className="text-2xl font-semibold text-white "> Favoriler </p>
                        </div>
                        <div className="absolute top-9 left-6" >
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-amber-50 hover:text-amber-50 font-semibold"
                            >
                                <FaArrowLeftLong />
                                Geri Dön
                            </button>
                        </div>
                        <div className="w-full py-10 text-center">
                            <p className="text-xl font-medium text-gray-600">Hiç favori eklenmemiş.</p>
                        </div>
                    </div>
                )}
        </>
    )
}

export default FavoritesPage