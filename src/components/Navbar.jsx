import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ListFavorites from "./ListFavorites";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const [favoritesPokemon, setFavoritesPokemon] = useState()
	const [favoritesItem, setFavoritesItem] = useState()


	useEffect(() => {

		setFavoritesItem(store.favoritesItems)
		setFavoritesPokemon(store.favoritesPokemon)
		dispatch({
			type: 'updateTotalFavorites',
			payload: { totalFavorites: store.favoritesPokemon.length + store.favoritesItems.length }

		})


	}, [store.favoritesPokemon, store.favoritesItems])


	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid mx-4">
				<Link to="/">
					<img className="w-50 my-2" src="src/assets/img/logo_pokemon.jpg" alt="" />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon text-primary"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<div className="btn-group dropcenter">
						<button type="button" className="btn btn-primary me-5 " data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
								{store?.totalFavorites}
							</span>
						</button>
						<ul className="dropdown-menu w-auto p-2">
							{(favoritesItem?.length === 0 && favoritesPokemon.length === 0) ? <li className="text-center">No hay favoritos</li> : ""}
							{(favoritesPokemon?.length !== 0) ? <li className="text-center bg-primary text-white">Pokemons</li> : ""}
							{favoritesPokemon?.map((e, index) => {
								return <ListFavorites key={index} favorite={e} whatIs={'pokemon'} />
							})}
							{(favoritesItem?.length !== 0) ? <li className="text-center bg-primary text-white">Items</li> : ""}
							{favoritesItem?.map((e, index) => {

								return <ListFavorites key={index} favorite={e} whatIs={'items'} />
							})}
						</ul>
					</div>




				</div>
			</div>
		</nav>
	);
};