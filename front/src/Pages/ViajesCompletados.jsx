import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesCards from "../Components/ViajesCards";
import axios from "axios";

const URL_ViajesCompletados = "api/buscar/viajes";

const ViajesCompletados = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    const location = useLocation();
    const [viajes, setViajes] = useState([]);
    const [NombreOrigen, setNombreOrigen] = useState("");
    const [NombreDestino, setNombreDestino] = useState("");


    return (
        <div className="container mx-auto my-8">
            <h1 className="text-center text-4xl">Viajes Completados</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                {viajes.map((viaje, index) => (
                    <ViajesCards
                        key={index}
                        marca={viaje.marca_autobus}
                        horallegada={viaje.hora_estimada_llegada}
                        escalas={viaje.numero_escalas}
                        tiempoestimado={viaje.horas_estimadas_viaje}
                        onClick={handleTarjetaClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViajesCompletados;
