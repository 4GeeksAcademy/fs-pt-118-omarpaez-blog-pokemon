const pokeApiServices = {}
const url = 'https://pokeapi.co/api/v2'

// obtiene lista de pokemons
pokeApiServices.getPokemons = async () => {
    try {
        const resp = await fetch(url + '/pokemon')
        if (!resp.ok) throw new Error('error fetching pokemons')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

//obtiene lista de items
pokeApiServices.getItems = async () => {
    try {
        const resp = await fetch(url + '/item')
        if (!resp.ok) throw new Error('error fetching items')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// obtiene informacion de pokemon por nombre
pokeApiServices.getPokemon = async (name) => {
    try {
        const resp = await fetch(url + `/pokemon/${name}`)
        if (!resp.ok) throw new Error('error fetching image pokemon')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
//obtiene informacion item por nombre
pokeApiServices.getItem = async (name) => {
    try {
        const resp = await fetch(url + `/item/${name}`)
        if (!resp.ok) throw new Error('error fetching image item')
        const data = await resp.json()
        // console.log('items',data)
        return data
    } catch (error) {
        console.log(error)
    }
}

//obtiene la descripcion y sex segun el rate del pokemon en español
pokeApiServices.getDescriptionPokemon = async (name) => {
    try {
        const resp = await fetch(url + `/pokemon-species/${name}`)
        if (!resp.ok) throw new Error('error fetching description pokemon')
        const data = await resp.json()
        const description = data.flavor_text_entries.find((e) => e.language.name === "es")
        const rate = data.gender_rate
        const category = data.genera.find(e => e.language.name === "es");

        let sex = ""

        const female = (rate / 8) * 100;
        const male = 100 - female;

        if (rate === -1) {
            sex = "SN";
        } else if (rate === 0) {
            sex = "M";
        } else if (rate === 8) {
            sex = "F"
        } else {
            sex = "FM"
        }


        return {
            "description": description.flavor_text.replace(/\n|\f/g, " "),
            "sex": sex,
            "category": category ? category.genus : "Categoria no encontrada"
        }
    } catch (error) {
        console.log(error)
    }

}

// se obtienen la gabilidades del pokemon 
pokeApiServices.getAbilitiesES = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error('error fetching abilities')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// se obtiene el tipo de pokemon en español
pokeApiServices.getTypesES = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error('error fetching types')
        const data = await resp.json()
        const esName = data.names.find(e => e.language.name === "es")
        return esName ? esName.name : type.type.name
    } catch (error) {
        console.log(error)
    }
}


pokeApiServices.getStatsES = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error('error fetching stats')
        const data = await resp.json()
        const esName = data.names.find(e => e.language.name === "es")
        return esName ? esName.name : type.type.name
    } catch (error) {
        console.log(error)
    }
}

// obtiene los movimientos del pokemon y la categoria de los movimientos
pokeApiServices.getMoveES = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error('error fetching types')
        const data = await resp.json()
        const esName = data.names.find(e => e.language.name === "es")
        const categoryName = data.damage_class.name
        return {
            name: esName ? esName.name : data.name,
            category: categoryName
        }
  } catch (error) {
        console.log(error)
    }
}

// se intenta crear una funcion generica para reutilizar cuando el parametro a enviar  a la API es una URL
pokeApiServices.getDataUrl = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error('error fetching data')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}



export default pokeApiServices