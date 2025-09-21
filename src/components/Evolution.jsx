import React from "react";

const Evolution = ({ evolution = [] }) => {
    console.log(evolution)
    return (
        <>
        <div className="container">
                <h5 className="px-3 my-3 pokemon-title">Evolución</h5>
                <div id="carouselExampleFade" className="carousel slide carousel-fade ">
                <div className="carousel-inner ">
                 {evolution?.map((e, index)=>(
                    <div key={index}  className={`carousel-item ${index === 0 ? "active" : ""} d-flex flex-column align-items-center`}>
                        <p className="bg-veneno px-3 rounded text-white fs-4">{index+1}</p>
                        <img src={e.img}className="d-block w-50 " alt={e.name}></img>
                        <p className="fs-3">{e.name}</p>
                    </div>
                ))} 
                </div>
                
                    
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-veneno" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-veneno" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
               
        </div>
        </>
    )

}

export default Evolution