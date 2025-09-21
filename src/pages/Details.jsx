import React from "react";
import { useParams } from "react-router-dom";
import pokeApiServices from "../services/pokeApiServices";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Basepoints from "../components/Basepoints";
import Move from "../components/Move";
import Evolution from "../components/Evolution";
import { Link } from "react-router-dom";
import CardDetailsPokemon from "../components/CardDetailsPokemon";
import CardDetailsItem from "../components/CardDetailsItem";


const Details = () => {
    const { store, dispatch } = useGlobalReducer()

    const params = useParams()
    const [data, setData] = useState()
    const [description, setDescription] = useState()
    const [types, setTypes] = useState()
    const [stats, setStats] = useState([])
    const [moves, setMoves] = useState()
    const [moveSpecial, setMoveSpecial] = useState()
    const [movStatus, setMoveStatus] = useState()
    const [movPhysical, setMovePhysical] = useState()
    const [dataEvolution, setDataEvolution] = useState()
    const [evolution, setEvolution] = useState()
    const [infoObj, setInfoObj] = useState()



    // const [moveSpecial, setMoveSpecial] = useState()




    const [nameAbilities, setNameAbilities] = useState()

    const icoGen = {
        "M": `fa-solid fa-mars`,
        "F": `fa-solid fa-venus`,
        "FM": `fa-solid fa-mars-and-venus`,
        "SN": `fa-solid fa-genderless`
    }

    const { pwhatis, pname } = useParams();



    useEffect(() => {

        if (pwhatis === "pokemon") {
            pokeApiServices.getPokemon(pname).then(async result => {
                setData(result)
                const abilitiesEN = result.abilities.map(e => e.ability.url)

                const description = await pokeApiServices.getDescriptionPokemon(pname)
                setDescription(description)

                //obiente habilidades en español
                const abilitiesEs = await Promise.all(
                    abilitiesEN.map(async (url) => {
                        const abilityData = await pokeApiServices.getAbilitiesES(url)
                        const esName = abilityData.names.find(e => e.language.name === "es")
                        return esName ? esName.name : abilityData.name

                    })
                )
                setNameAbilities(abilitiesEs)

                // se obtiene  tipos en español
                const typesRes = await Promise.all(
                    result.types.map(async (type) => {
                        return await pokeApiServices.getTypesES(type.type.url)
                    })
                )
                setTypes(typesRes)

                //se obtiene punto de base en español
                const statsRes = await Promise.all(
                    result.stats.map(async (stat) => {
                        return { name: await pokeApiServices.getStatsES(stat.stat.url), value: stat.base_stat }
                    })
                )
                setStats(statsRes)

                // se obtiene movimientos en español
                const moveRes = await Promise.all(
                    result.moves.map(async (move) => {
                        return await pokeApiServices.getMoveES(move.move.url)
                    })
                )
                setMoves(moveRes)

                //se agrupan los tipos de movimiento o ataque
                const moveSpecial = moveRes.filter((move) => move.category === 'special')
                setMoveSpecial(moveSpecial)
                const movStatus = moveRes.filter((move) => move.category === 'status')
                setMoveStatus(movStatus)
                const movPhysical = moveRes.filter((move) => move.category === 'physical')
                setMovePhysical(movPhysical)


                //se obtiene cada de evolucion
                const specieData = await pokeApiServices.getDataUrl(result.species.url)
                const evolutionUrl = specieData.evolution_chain.url
                const evolutionData = await pokeApiServices.getDataUrl(evolutionUrl)

                //funcion recorre el objeto chain para allar las evoluciones
                let arrEvolution = [];
                const getEvolution = (chain) => {
                    arrEvolution.push(chain.species.name)
                    chain.evolves_to.forEach(evo => getEvolution(evo))

                };

                getEvolution(evolutionData.chain)
                setDataEvolution(arrEvolution)

            })

        }

        if (pwhatis === "items") {
            pokeApiServices.getItem(pname).then(async result => {
                setData(result)
                console.log(result)
            })

        }

    }, [])


    useEffect(() => {
        const getDataEvolution = async () => {

            const evolution = await Promise.all(
                dataEvolution.map(async (name) => {
                    const data = await pokeApiServices.getPokemon(name);
                    return {
                        name: data.name,
                        img: data.sprites.other['official-artwork'].front_default
                    }
                })
            )
            setEvolution(evolution)
            console.log(evolution)

        }




        if (dataEvolution?.length) {
            getDataEvolution()
        }
    }, [dataEvolution])

    useEffect(() => {

        if (pwhatis === 'pokemon') {
            setInfoObj({
                id: data?.id,
                img: data?.sprites?.other?.['official-artwork'].front_default,
                description: description?.description,
                name: data?.name,
                height: ((data?.height) / 10),
                weight: ((data?.weight) / 10),
                sex: description?.sex,
                category: description?.category
            })

        }

        if (pwhatis === 'items') {
            const attributesEs = data?.attributes.map(att =>
                store?.attributesItem?.[att?.name] || att?.name
            )

            setInfoObj(
                {
                    id: data?.id,
                    name: data?.names.find(e => e.language.name === "es")?.name,
                    img: data?.sprites.default,
                    category: data?.category.name,
                    description: data?.flavor_text_entries.find(e => e.language.name === "es")?.text,
                    effect: data?.effect_entries.find(e => e.language.name === "es")?.short_effect || data?.effect_entries.find(e => e.language.name === "en")?.short_effect,
                    attribute: attributesEs
                }
            )

        }
    }, [data, description])

    if (!data) return <p>Cargando...</p>;




  
    return (
        <>

            {data &&
                <div className="container  bg-white rounded-3 pb-3">
                    <div className="my-5 text-capitalize text-center" >
                        <h2 className="card-title text-capitalize text-center fs-1 pokemon-title">{infoObj?.name}</h2>
                        <p className="fs-5 text-primary">{`#${String(infoObj?.id).padStart(4, 0)}`}</p>
                    </div>
                    <div className="card mb-4 border-1 rounded-3 ">
                        {pwhatis === "pokemon" && <CardDetailsPokemon infoObj={infoObj} nameAbilities={nameAbilities} types={types} />}
                        {pwhatis === "items" && <CardDetailsItem infoObj={infoObj} />}

                    </div>
                    {pwhatis === "pokemon" && (<div className="row">
                        <div className="col-sm-12 col-md-4 mb-5" >
                            {stats && <Basepoints stats={stats} />}
                        </div>
                        <div className="col-sm-12 col-md-4 ">
                            {moves && <Move moveSpecial={moveSpecial} movPhysical={movPhysical} movStatus={movStatus} />}
                        </div>
                        <div className="col-sm-12 col-md-4 ">
                            <Evolution evolution={evolution} />
                        </div>
                    </div>)}
                    <div className="d-flex justify-content-center mb-3">
                        <Link className="btn btn-primary w-50" to={'/'}>Volver</Link>
                    </div>
                </div>
            }
        </>
    )


}


export default Details