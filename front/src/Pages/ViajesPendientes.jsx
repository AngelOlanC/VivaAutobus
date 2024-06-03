import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import ViajesPendientesCards from "../Components/ViajesPendientesCards";
import axios from "axios";

const URL_ViajesPendientes = "api/usuario/misViajes/pendientes";

const ViajesCompletados = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [viajes, setViajes] = useState([]);


    const ObtenerViajesPendientes = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await axios.get(URL_ViajesPendientes, {
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
        ObtenerViajesPendientes();
    }, [user, loading]);

    const cancelarOrden = async (idOrden) => {
        const token = localStorage.getItem("token");
        console.log(token);
        const URL_CANCELAR_ORDEN = `api/ordenes/${idOrden}`;
        try {
            console.log(URL_CANCELAR_ORDEN)
            const res = await axios({
                method:'DELETE',
                url:URL_CANCELAR_ORDEN,
                headers:{
                  Authorization: token,
                }
            });
            console.log(res);
            return true;
        } catch(e) {
            console.log(e)
            return false;
        }
    };

    const onClick = async ({ idOrden }) => {
        if (await cancelarOrden(idOrden)) {
            alert('Orden cancelada con exito')
            window.location.reload(); 
        } else {
            console.log("XD ")
            alert('No se puede cancelar en este momento')
        }
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-center text-4xl">Viajes Pendientes</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                {viajes.map((viaje, index) => (
                    <ViajesPendientesCards
                        key={index}
                        idOrden={viaje.idOrden}
                        idViaje={viaje.idViaje}
                        fechaPartida={viaje.fechaPartida}
                        fechaLlegada={viaje.fechaLlegada}
                        ciudades={viaje.ciudades}
                        numeroEscalas={viaje.numeroEscalas}
                        clase={viaje.clase}
                        asiento={viaje.asiento}
                        precio={viaje.precio}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViajesCompletados;
