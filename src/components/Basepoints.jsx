import React from "react";


const Basepoints = ({ stats = [] }) => {
    console.log(stats)
    return (
        <>  
        <h5 className="px-3 my-3 pokemon-title">Puntos de Base</h5>
            {stats?.map((e, index) => (
                <div className="d-flex align-items-center gap-2 mb-2" key={index}>
                    <p className="m-1">{e.name}</p>
                    <div className="progress flex-grow-1 " style={{ height: "20px" }} role="progressbar" aria-label="Info striped example" aria-valuenow={e.value} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar progress-bar-striped bg-agua" style={{ width: `${e.value / 2}%` }}></div>

                    </div>

                </div>

            ))}


        </>

    )
}
export default Basepoints