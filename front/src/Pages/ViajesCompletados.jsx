import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesCards from "../Components/ViajesDisponiblesCards";
import axios from "axios";

const URL_ViajesCompletados = "api/buscar/viajesCompletos";

const ViajesCompletados = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [viajes, setViajes] = useState([]);


    const ObtenerViajesCompletados = async () => {
        try {
            const token = localStorage.getItem("token");
            const idUsuario = user?.id;
            console.log("usuario: ", idUsuario);
            const response = await axios.get(`${URL_ViajesCompletados}/${idUsuario}`, {
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
                    <ViajesCards
                        key={index}
                        marca={viaje.marca_autobus}
                        horallegada={viaje.hora_estimada_llegada}
                        escalas={viaje.numero_escalas}
                        tiempoestimado={viaje.horas_estimadas_viaje}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViajesCompletados;
