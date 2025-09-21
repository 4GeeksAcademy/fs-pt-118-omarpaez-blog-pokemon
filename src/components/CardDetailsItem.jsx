import React from "react";

const CardDetailsItem =({infoObj}) =>{

    return(
         <div className="row g-0">
            <div className="col-sm-12 col-md-5 align-content-center bg-light rounded-start-3">
                <img src={infoObj?.img} className="card-img img-fluid " alt="..."></img>
            </div>
            <div className="col-sm-12 col-md-7  p-4 my-3">
                <div className="card-body justify-items-center p-2">
                    <div className="row mb-3">
                        <div className="col-12">
                            <p className="card-text fs-5">{infoObj?.description}</p>
                        </div>
                    </div>
                    <div className="row d-flex flex-column text-white p-3">
                         <div className="col-sm-12 col-md-6">
                            <p className="m-0 fs-5 bg-dark rounded-2 pokemon-title p-1">Categoria</p>
                            <p className="text-primary fs-4">{`${infoObj?.category}`}</p>
                          </div>
                        <div className="col-sm-12 col-md-6">
                           
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header ">
                                      <button className="accordion-button m-0 fs-5 bg-dark rounded-2 pokemon-title p-1 mb-2 text-white" type="button" aria-expanded="true" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-controls="panelsStayOpen-collapseOne">
                                           Atributos
                                        </button> 
                                       
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                        <div className="accordion-body  active-scroll">
                                            {infoObj.attribute?.map(e =>(
                                                <ul>
                                                    <li>{e}</li>
                                                </ul>
                                            ))} 
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>

                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center mx-2 my-2 ">
                        
                    </div>

                </div>
            </div>
        </div>



    )

}

export default CardDetailsItem