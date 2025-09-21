export const initialStore=()=>{
  return{
 attributesItem: {
  countable: "Contable: Se puede contar en el inventario",            
  consumable: "Consumible: Se puede usar y desaparece tras el uso",          
  "usable-overworld": "Usable fuera de batalla", 
  "usable-in-battle": "Usable en batalla",      
  holdable: "Equipable: Puede ser llevado por un Pokémon",               
  "holdable-passive": "Efecto pasivo al llevarlo", 
  "holdable-active": "Efecto activo al usarlo",   
  underground: "Subterráneo: Usado en la función subterráneo o similar"          
},

    typeColorsES: {
      normal: "bg-normal",
      fuego: "bg-fuego",
      agua: "bg-agua",
      planta: "bg-planta",
      eléctrico: "bg-eléctrico",
      hielo: "bg-hielo",
      lucha: "bg-lucha",
      veneno: "bg-veneno",
      tierra: "bg-tierra",
      volador: "bg-volador",
      psíquico: "bg-psíquico",
      bicho: "bg-bicho",
      roca: "bg-roca",
      fantasma: "bg-fantasma",
      dragón: "bg-dragón",
      siniestro: "bg-siniestro ",
      acero: "bg-acero",
      hada: "bg-hada"
    },


    favoritesPokemon:[],
    favoritesItems:[],
    totalFavorites: 0,

    listPokemon:null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'updateTotalFavorites':
      
      return{
        ...store,
        totalFavorites : action.payload.totalFavorites
      }


     case 'saveItemsFavorites':
      return{
        ...store,
        favoritesItems : action.payload.favoritesItems
      }
    case 'savePokemonFavorites':
      return{
        ...store,
        favoritesPokemon : action.payload.favoritesPokemon
      }

    case 'updateItem':
    
      const dataItem = action.payload.infoItem
      return{
        ...store,
        items: store.items.map(item =>
          item.name === action.payload.name
          ? {...item, img: dataItem.sprites.default,
            id: dataItem.id,
            category: dataItem.category.name,
            effect: dataItem.effect_entries[0]?.short_effect
          }
          : item
        )
      };




    case 'updatePokemon':
      const data = action.payload.infoPokemon
      return {
        ...store,
        pokemons: store.pokemons.map(pokemon =>
          pokemon.name === data.name
            ? { ...pokemon, 
              img: data.sprites.other['official-artwork'].front_default,
              types:data.types,
              id: data.id,
              weight: data.weight,
              height: data.height
             }
            : pokemon
        )
      };

    case 'getItems':
      return{
        ...store,
        items: action.payload.data
      }



    case 'getPokemons':
    return {
      ...store,
      pokemons: action.payload.data
    }
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
