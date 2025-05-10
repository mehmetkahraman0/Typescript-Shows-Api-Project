import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../app/store"
import { setSearchInput } from "../features/search/searchSlice"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaHeart, FaBars } from "react-icons/fa";
import { setCategoryName } from "../features/shows/showSlice"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";


const Navbar = () => {

  const dispatch = useDispatch()
  const searchInput = useSelector((state: RootState) => state.search.searchInput)
  const selectedCategory = useSelector((state: RootState) => state.show.categoryName)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value))
  }

  const handleSelectCategory = (category: string) => {
    dispatch(setCategoryName(category))
    setMobileMenuOpen(!mobileMenuOpen)
    navigate("/")
  }
  console.log("arama degerin : " + searchInput)
  console.log("seçilen category :" + selectedCategory)


  return (
    <div className="h-16 px-6 flex justify-between items-center w-screen bg-white shadow relative">
      <div className="" >
        <Link to="/">
          <img onClick={() => handleSelectCategory("")} className="cursor-pointer " style={{height:20}} src={logo} alt="logo"/>
        </Link>
      </div>
      <div className="w-2/6 flex justify-center items-center space-x-2">
        <input
          className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-100 md md:w-20 lg:w-60 xl:w-80 "
          type="text"
          value={searchInput}
          onChange={handleSubmit}
          placeholder="Show Ara"
        />
        <button>
          <FaSearch className="text-gray-600" />
        </button>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
        >
          <FaBars />
        </button>
      </div>
      <div className="hidden md:flex w-2/6">
        <ul className="w-full flex justify-evenly text-gray-800 font-medium">
          <li>
            <a
              onClick={() => handleSelectCategory("Action")}
              className="px-3 py-2 hover:text-blue-600 cursor-pointer"
            >
              Aksiyon
            </a>
          </li>
          <li>
            <a
              onClick={() => handleSelectCategory("Drama")}
              className="px-3 py-2 hover:text-blue-600 cursor-pointer"
            >
              Drama
            </a>
          </li>
          <li>
            <a
              onClick={() => handleSelectCategory("Comedy")}
              className="px-3 py-2 hover:text-blue-600 cursor-pointer"
            >
              Komedi
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex w-1/6 justify-end pr-4">
        <Link
          className="flex items-center space-x-1 text-red-700 hover:text-red-600"
          to="/favoriti"
        >
          <span className="font-medium">Favoriler</span>
          <FaHeart />
        </Link>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md p-4 z-50 flex flex-col space-y-2 md:hidden"
          >
            <div className="flex flex-col space-y-2 text-gray-800 font-medium">
              <span
                onClick={() => handleSelectCategory("Action")}
                className="cursor-pointer hover:text-blue-600"
              >
                Aksiyon
              </span>
              <span
                onClick={() => handleSelectCategory("Drama")}
                className="cursor-pointer hover:text-blue-600"
              >
                Drama
              </span>
              <span
                onClick={() => handleSelectCategory("Comedy")}
                className="cursor-pointer hover:text-blue-600"
              >
                Komedi
              </span>
            </div>
            <Link
              to="/favoriti"
              className="flex items-center space-x-1 text-red-700 hover:text-red-600"
            >
              <span className="font-medium">Favori Showlar</span>
              <FaHeart />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  )
}

export default Navbar

