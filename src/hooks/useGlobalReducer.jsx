// Import necessary hooks and functions from React.
import { useContext, useReducer, useEffect, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.
import pokeApiServices from "../services/pokeApiServices";
// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state.
  const [store, dispatch] = useReducer(storeReducer, initialStore())

  useEffect(() => {
    pokeApiServices.getPokemons().then(data => {

      dispatch({ type: 'getPokemons', payload: { data: data.results } });

      //agregamos la imagen al pokemon en la medida que se vayan agregando pokemons al store con async

      data.results.forEach(async (pokemon) => {
        const infoPokemon = await pokeApiServices.getPokemon(pokemon.name);


        dispatch({
          type: 'updatePokemon',
          payload: { name: pokemon.name, infoPokemon: infoPokemon }
        });
      });

    });




    pokeApiServices.getItems().then(data => {
      dispatch({ type: 'getItems', payload: { data: data.results } });

      data.results.forEach(async (item) => {
        const infoItem = await pokeApiServices.getItem(item.name);

        dispatch({
          type: 'updateItem',
          payload: { name: item.name, infoItem: infoItem },

        })

      })

    })

    // verfica si existen pokemons favoritos y actualiza el estado
    if (localStorage.getItem('pokemon')) {
       dispatch({
        type: 'savePokemonFavorites',
        payload: { favoritesPokemon: JSON.parse(localStorage.getItem('pokemon')) }
      })
    }

    // verfica si existen pokemons favoritos y actuaiza el estado
    if (localStorage.getItem('items')) {
      dispatch({
        type: 'saveItemsFavorites',
        payload: { favoritesItems: JSON.parse(localStorage.getItem('items')) }
      })
    }


  }, []);


  // Provide the store and dispatch method to all child components.
  return <StoreContext.Provider value={{ store, dispatch }}>
    {children}
  </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  const { dispatch, store } = useContext(StoreContext)
  return { dispatch, store };
}