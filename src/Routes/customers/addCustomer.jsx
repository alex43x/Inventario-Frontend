import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descrip, setDescrip] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedOption, setSelectedOption] = useState(""); // Estado para guardar la opción seleccionada

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories`)
      .then((response) => {
        console.log("Categorías recibidos", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Actualiza el estado con el valor seleccionado
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);

    try {
      const response = await axios.post("http://localhost:3000/customers", {
        id: id,
        nombre: nombre,
        saldo: saldo});
      console.log("Producto añadido:", response.data);
      alert("Producto añadido con éxito");
      const originalData = response.data;
      navigate(-1);
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      alert("Hubo un error al añadir el producto");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-12 p-5 text-center">
        Añadir Cliente
      </h1>
      <h3 className="text-3xl font-bold text-green-800 m-2 p-5 text-center">
        Datos del cliente
      </h3>

      <div className="flex justify-center">
        <form
          className=" text-green-800 text-left  border-2 border-green-700 rounded-lg p-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="block mt-2">C.I.: </label>
            <input
              className="w-full rounded-md pl-2"
              type="number"
              placeholder="Cédula de Identidad"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <br />
            <label>Nombre </label>
            <input
              className="w-full rounded-md pl-2"
              placeholder="Nombre del cliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <br />
            <label>Saldo </label>
            <input
              className="w-full rounded-md pl-2 mb-2"
              type="number"
              value={saldo}
              min={0}
              onChange={(e) => setSaldo(e.target.value)}
              required
            />
            <br />
          </div>
          <button
            className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
            type="submit"
          >
            Agregar Cliente
          </button>
          <br />
        </form>
      </div>
      <div className="flex justify-center items-center h-full">
        <a href="/Productos">
          <button className="text-gray-300 m-4 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900">
            Regresar
          </button>
        </a>
      </div>
    </div>
  );
}
