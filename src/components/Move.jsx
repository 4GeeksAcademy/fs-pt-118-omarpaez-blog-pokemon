import React from "react";

const Move =({ moveSpecial = [] ,movPhysical = [] , movStatus = []} ) =>{
    return(
<>
          <h5 className="px-3 my-3 pokemon-title">Movimientos</h5>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header ">
                                        <button className="accordion-button bg-planta text-white fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            Especial
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                                        <div className="accordion-body  active-scroll">
                                            {moveSpecial?.map(e =>(
                                                <ul>
                                                    <li>{e.name}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button bg-planta text-white fs-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            Fisico
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                        <div className="accordion-body active-scroll">
                                            {movPhysical?.map(e =>(
                                                <ul>
                                                    <li>{e.name}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button  bg-planta text-white fs-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                          Estado
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                        <div className="accordion-body active-scroll ">
                                            {movStatus?.map(e =>(
                                                <ul>
                                                    <li>{e.name}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                       
</>

    )
}
export default Move