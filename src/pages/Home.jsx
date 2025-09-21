import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import Card from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import pokeApiServices from "../services/pokeApiServices.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	

	
	


	return (
		<div className="container mt-2 mb-2 bg-white p-4 rounded-3 container-style">
			<h2 className="text-center">Pokemons</h2>
			<div className="container  containersize border border-warning-subtle rounded-3">
				
				<div className="d-flex overflow-x-auto mx-0 my-3">

					{store.pokemons?.map(el => (
						<div className="mt-3" key={el.name}>
							<Card key={el.id} data={el} whatIs={'pokemon'} />
						</div>
					))}


				</div>
			</div>
			<h2 className="text-center  mt-5">Items</h2>
			<div className="container containersize border border-warning-subtle rounded-3">
				<div className="d-flex overflow-x-auto">

					{store.items?.map(el => (
						<div className="mt-3" key={el.name}>
							<Card key={el.id} data={el} whatIs={'items'} />
						</div>
					))}


				</div>
			</div>
		</div>
	);
}; 