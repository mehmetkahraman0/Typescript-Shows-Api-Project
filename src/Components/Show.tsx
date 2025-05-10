import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { controlFavorites } from "../features/favorites/favoritesSlice";
import type { RootState } from "../app/store";

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const showId = show?.show?.id || show?.id;

  const favoritesControll = () => {
    //normalize işlemi
    const normalizedShow = show?.show || show;
    dispatch(controlFavorites(normalizedShow));
  }

  const isFavorited = favorites.some(item => item?.id === showId);

  const imageSrc = show?.show?.image?.medium || show?.image?.medium || "";

  return (
    <div className="bg-gray-300 block border border-gray-600 rounded-xl overflow-hidden transition-shadow hover:shadow-2xl hover:border-indigo-800" style={{ width: "300px" }}>
      <Link to={`/${showId}`}>
        <img className="w-full h-auto aspect-[2/3] object-cover" src={imageSrc} alt="poster" />
      </Link>
      <div className="flex justify-between items-center pb-2 pl-2 pr-2">
        <Link to={`/${showId}`}>
          <p className="text-lg font-medium"> {show?.show ? show?.show.name : show?.name} </p>
        </Link>
          <button onClick={favoritesControll} className={isFavorited ? "text-red-500 hover:text-gray-500 transition-colors" : "text-gray-500 hover:text-red-500 transition-colors"}>
          <FaHeart />
        </button>
      </div>
    </div>
  );
};
export default Show