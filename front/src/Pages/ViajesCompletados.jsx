import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesCompletadosCards from "../Components/ViajesCompletadosCards";
import axios from "axios";

const URL_ViajesCompletados = "api/usuario/misViajes/completados";

const ViajesCompletados = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [viajes, setViajes] = useState([]);


    const ObtenerViajesCompletados = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await axios.get(URL_ViajesCompletados, {
                headers: {
                    Authorization: token,
                },
            });
            const data = response.data;
            console.log(data);
            if (Array.isArray(data.rows)) {
                setViajes(data.rows);
            }
        } catch (error) {
            alert("Error al obtener los viajes", error);
        }
    }

    useEffect(() => {
        console.log(loading, user);
        if (loading) {
            return;
        }
        if (!loading && !user) {
            navigate("/login");
            alert("Debes iniciar sesión para acceder a esta página");
            return;
        }
        ObtenerViajesCompletados();
    }, [user, loading]);


    return (
        <div className="container mx-auto my-8">
            <h1 className="text-center text-4xl">Viajes Completados</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                {viajes.map((viaje, index) => (
                    <ViajesCompletadosCards
                        key={index}
                        idViaje={viaje.idViaje}
                        fechaPartida={viaje.fechaPartida}
                        fechaLlegada={viaje.fechaLlegada}
                        ciudades={viaje.ciudades}
                        numeroEscalas={viaje.numeroEscalas}
                        clase={viaje.clase}
                        asiento={viaje.asiento}
                        precio={viaje.precio}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViajesCompletados;
