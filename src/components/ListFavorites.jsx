import React from "react";

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";






const ListFavorites = ({ favorite, whatIs }) => {
    
   const { store, dispatch } = useGlobalReducer()
    // se elimina de favoritos el pokemon o item seleccionado desde la lista de favoritos
    const handleDelete= () => {
         let favorites = []
        if(whatIs === 'pokemon'){
          favorites = store.favoritesPokemon?.filter(e => e !== favorite)
          dispatch({
                     type: 'savePokemonFavorites',
                     payload: { favoritesPokemon: favorites }
                 })
        } else if (whatIs === 'items'){
             favorites =  store.favoritesItems?.filter(e => e !== favorite)
             dispatch({
                     type: 'saveItemsFavorites',
                     payload: { favoritesItems: favorites }
                 })
        }
       
	 localStorage.setItem(whatIs, JSON.stringify(favorites))

    }
    
    return (
        <div className="d-flex align-items-center gap-1 my-1 px-1 justify-content-between">
            <li><Link className="dropdown-item text-capitalize" href="#" to={`/${whatIs}/${favorite}`}>{favorite}</Link></li>
            <span className="pointer text-danger "><i className="fa-solid fa-heart-circle-minus" onClick={handleDelete}></i></span> 
        </div>

    )
}

export default ListFavorites