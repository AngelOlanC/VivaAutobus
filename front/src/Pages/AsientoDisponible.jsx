import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Components/UserContext";
import asientoDisponibleImg from "../Images/asientoDisponible.png";
import asientoOcupadoImg from "../Images/asientoOcupado.png";

const AsientosDisponibles = () => {
    const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
    const [asientoDisponible, setAsientoDisponible] = useState([]);
    const { idViaje, idOrigen, idDestino } = useParams();
    const { user, loading } = useUser();
    const [cargando, setCargando] = useState(true);

    const asientosURI = "http://localhost:4000/buscar/asientos/" + idViaje + "/" + idOrigen + "/" + idDestino;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAsientosDisponibles = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get(asientosURI, {
                    headers: {
                        Authorization: token,
                    },
                });
                setAsientoDisponible([]);
                res.data.rows.forEach((asiento) => {
                    setAsientoDisponible((prev) => [...prev, asiento.estado == "libre" ? true : false]);
                });
                setCargando(false);
            } catch (error) {
                console.log("Fetch error: ", error);
            }
        };

        if (loading) return;
        if (!user) {
            navigate("/login");
        }

        fetchAsientosDisponibles();
    }, [loading]);

    const setSelected = (asiento) => {
        setAsientoSeleccionado(asiento);
    };

    const submit = () => {
        if (asientoSeleccionado) {
            console.log(`Asiento seleccionado: ${asientoSeleccionado}`);
        } else {
            console.log("No se ha seleccionado ningÃºn asiento");
        }
    };

    if (cargando) return (<div>Cargando...</div>);
    return (
        <div className="container mx-auto mb-20">
            <div className="flex justify-center items-center min-h-screen rounded-lg">
                <div className="p-8 border-2 border-black rounded-md shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        Asientos Disponibles
                    </h1>
                    <div className="grid grid-cols-7 grid-rows-4 gap-2 ">
                        {
                            asientoDisponible.map((asiento, index) => (
                                <>
                                    {((index) == 3 || index == 9 || index == 15 || index == 21) && <div className="w-15 h-15 md:w-20 md:h-20 "></div>}
                                    <div
                                        className={`w-15 h-15 md:w-20 md:h-20 rounded-lg text-center ${asiento ? "cursor-pointer" : "cursor-not-allowed"
                                            } ${asientoSeleccionado === index ? "bg-slate-300" : ""}`}
                                        onClick={() => asiento ? setSelected(index) : null}
                                    >
                                        <img src={asiento ? asientoDisponibleImg : asientoOcupadoImg} alt={`asiento-${index}`} />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-white text-black border-2 border-black py-2 px-4  rounded-lg hover:bg-slate-300"
                            onClick={submit}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsientosDisponibles;