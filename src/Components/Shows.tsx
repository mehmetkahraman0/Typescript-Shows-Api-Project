import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../app/store"
import { fetchSearchShows } from "../features/shows/searchShowSlice"
import { fetchShows } from '../features/shows/showSlice';
import Show from "./Show";

const Shows = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch<AppDispatch>()

    const { show, loading } = useSelector((state: RootState) => state.show)
    const { searchShow, searchLoading } = useSelector((state: RootState) => state.searchShow)

    const selectedCategory = useSelector((state: RootState) => state.show.categoryName)
    const searchInput = useSelector((state: RootState) => state.search.searchInput)

    const itemsPerPage = 16;

    const data = searchInput ? searchShow : show;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data?.slice(startIndex, endIndex);


    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

    useEffect(() => {
        if (searchInput) {
            dispatch(fetchSearchShows(searchInput))
            setCurrentPage(1);
        }
    }, [dispatch, searchInput])

    useEffect(() => {
        if (!searchInput) {
            dispatch(fetchShows(selectedCategory))
            setCurrentPage(1);
        }
    }, [dispatch, selectedCategory, searchInput])
    return (
        <div>
            {(loading || searchLoading) && (
                <div className="flex justify-center items-center h-40">
                    <div className="text-xl text-blue-600 animate-pulse">Yükleniyor...</div>
                </div>
            )}

            <div className={selectedCategory ? "var visible w-full py-4 mt-4 bg-gray-700 text-center" : "yok hidden w-full py-2 bg-gray-700 text-center"}>
                <p className="text-2xl font-semibold text-white "> {selectedCategory == "Action" ? "Aksiyon Filmleri" : selectedCategory == "Drama" ? "Dram Filmleri" : selectedCategory == "Comedy" ? "Komedi Filmleri" : ""} </p>
            </div>

            {!loading && !searchLoading && (
                <>
                    <div className="flex flex-wrap justify-evenly gap-4 mt-4">
                        {currentData?.map((show, index) => (
                            <Show key={index} show={show} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10 mb-10 space-x-2">
                        <button
                            onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Önceki
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Sonraki
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Shows