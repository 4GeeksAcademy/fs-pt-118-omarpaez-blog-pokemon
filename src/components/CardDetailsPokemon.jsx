
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardDetailsPokemon = ({infoObj, nameAbilities, types}) => {
    const { store, dispatch } = useGlobalReducer()
const icoGen = {
        "M": `fa-solid fa-mars`,
        "F": `fa-solid fa-venus`,
        "FM": `fa-solid fa-mars-and-venus`,
        "SN": `fa-solid fa-genderless`
    }

    return (

        <div className="row g-0">
            <div className="col-sm-12 col-md-5 align-content-center bg-light rounded-start-3">
                <img src={infoObj?.img} className="card-img img-fluid " alt="..."></img>
            </div>
            <div className="col-sm-12 col-md-7  p-4 my-3">
                <div className="card-body justify-items-center p-2">
                    <div className="row mb-5">
                        <div className="col-12">
                            <p className="card-text fs-5">{infoObj?.description}</p>
                        </div>
                    </div>
                    <div className="row bg-agua rounded-4 text-white p-3">
                        <div className="col-sm-12 col-md-6  mb-3 mb-md-0">
                            <p className="m-0 fs-5">Altura</p>
                            <p className="text-dark">{`${infoObj?.height}m`}</p>
                            <p className="m-0 fs-5">Peso</p>
                            <p className="text-dark">{`${infoObj?.weight}kg`}</p>
                            <p className="m-0 fs-5">Genero</p>
                            <span className="justify-content-end pointer fs-2 text-warning"><i className={icoGen[infoObj?.sex]}></i></span>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <p className="m-0 fs-5">Categoria</p>
                            <p className="text-dark">{`${infoObj?.category}`}</p>
                            <p className="m-0 fs-5">Habilidad</p>
                            <>
                                {nameAbilities?.map(e => (
                                    <p className="text-dark m-0" key={e}>{e}</p>
                                ))}
                            </>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center mx-2 my-2 ">
                        <h5 className="px-3 my-3 pokemon-title">Tipo</h5>
                        <div className="d-flex flex-wrap gap-1">
                            {types?.map(e => (
                                <p className={`${store.typeColorsES[e.toLowerCase()]} px-4 py-1 my-3 text-white rounded-pill text-center `} key={e}>{e}</p>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )

}


export default CardDetailsPokemon