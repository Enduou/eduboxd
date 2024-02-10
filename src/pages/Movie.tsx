import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import{
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Movie = () => {
    const{ id } = useParams()
    const[movie, setMovie] = useState(null)

    const getMovie = async(url: RequestInfo | URL) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie(data);
    }

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`
        getMovie(movieUrl);
    }, [])

    const formatCurrency = (number: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => unknown; }) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        })
    }
    
    return(
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false}/>
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Movie Budget:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Movie Revenue:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                    
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Minutes:
                        </h3>
                        <p>{movie.runtime}</p>
                    </div>
                    
                    <div className="info-description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Overview: 
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Movie