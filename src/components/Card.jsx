import React, { useEffect, useState } from "react";
import pokeApiServices from "../services/pokeApiServices";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Card = ({ data, whatIs }) => {
    const { name, url, img, types, id, weight, height, category, effect } = data
    const colorTypes = {
        'fire': 'bg-red',
        'water': 'bg-blue',
        'grass': 'bg-gree',
        'flying': 'bg-indig',
        'poison': 'bg-purple',
        'bug': 'bg-lime',
        'normal': 'bg-gray',
    }

  
    const { store, dispatch } = useGlobalReducer()
    const [favoritesPokemon, setFavoritesPokemon] = useState()
    const [favoritesItems, setFavoritesItems] = useState()
     


    const saveFavorites = () => {
        let favorites = (whatIs === 'pokemon' ? favoritesPokemon : favoritesItems)
        if (favorites?.includes(name)) {
            favorites = favorites?.filter(e => e !== name)
         

        } else {
            favorites?.push(name)

        }
        localStorage.setItem(whatIs, JSON.stringify(favorites))

        if (whatIs === 'pokemon') {

            dispatch({
                type: 'savePokemonFavorites',
                payload: { favoritesPokemon: favorites }
            })
           
        } else if (whatIs === 'items') {

            dispatch({
                type: 'saveItemsFavorites',
                payload: { favoritesItems: favorites }

            })
           
        }

        
         dispatch({
                type: 'updateTotalFavorites',
                payload: { totalFavorites: store?.favoritesPokemon?.length + store?.favoritesItems?.length }

            })

    }

    useEffect(() => {
        setFavoritesPokemon(store.favoritesPokemon)
        setFavoritesItems(store.favoritesItems)
      
        
    }, [store.favoritesPokemon, store.favoritesItems])

    return (
        <>
            <div className="card me-3  d-flex my-3 mx-1 me-2 p-0 card-hover cardsize border border-secondary-subtle rounded-4 " >
                <div className="card-header border-0 text-end d-flex flex-column">
                    <span className="justify-content-end pointer "><i className={`fa-brands fa-gratipay fs-4 ${favoritesPokemon?.includes(name) || favoritesItems?.includes(name) ? "btn-favorite-active" : "btn-favorite"} `} onClick={saveFavorites} ></i></span>
                    <img src={img} className={`card-img-top text-center imgcard ${whatIs === "items" ? "item-pixel" : ""}`} alt={name}></img>
                </div>
                <div className="card-body ps-2 pt-0">
                    <h5 className="card-text text-center mb-0 fw-semibold fs-3 mx-2 text-capitalize">{name}</h5>
                    <p className="text-center mb-1">{`# ${String(id).padStart(4, 0)}`}</p>
                    <div className="d-flex justify-content-center gap-2 mb-2">
                        {types?.map((el, index) => (
                            <>
                                <div className={` ${colorTypes[el.type.name]} px-3  text-white rounded-pill `} key={index}>{el.type.name}</div>
                            </>
                        ))}
                    </div>
                    {(whatIs === "pokemon" && <div className="d-flex mb-1 gap-1 justify-content-center fs-7"><p><strong>Alto: </strong>{`${height / 10}m`}</p>
                        <p><strong>Peso: </strong>{`${weight / 10}kg`}</p></div>)}
                    {(whatIs === "items" && <div className=" mb-1 gap-1 fs-6 text-center"><p className="">{`${category}`}</p>
                    </div>)}
                    <div className="d-flex justify-content-center align-items-center">
                        <Link type="submit" className="btn btn-view btn-sm w-75 rounded-3 btn-hover " to={`/${whatIs}/${name}`} >Ver más</Link>

                    </div>
                </div>

            </div>

        </>

    )

}

export default Card