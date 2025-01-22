import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [nombre, setNombre] = useState("");
  const [descrip, setDescrip] = useState("");
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
      const response = await axios.post("http://localhost:3000/products", {
        nombre: nombre,
        descrip: descrip,
        stock: form.stock.value,
        iva: selectedOption,
        categoria: selectedCategory,
      });
      console.log("Producto añadido:", response.data);
      alert("Producto añadido con éxito");
      const originalData = response.data;
      navigate("/Inventario/addBatch", { state: { originalData } }); // Redirige al formulario de lote
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      alert("Hubo un error al añadir el producto");
    }
  };

  return (
    <div>
      <h1 className="text-7xl font-bold text-green-800 m-12 p-5 text-center">
        Añadir producto
      </h1>
      <h3 className="text-3xl font-bold text-green-800 m-2 p-5 text-center">
        Datos del producto
      </h3>

      <div className="flex justify-center">
        <form
          className=" text-green-800 text-left  border-2 border-green-700 rounded-lg p-3 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="block mt-2">Nombre: </label>
            <input
              className="w-full rounded-md pl-2"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <br />
            <label>Descripción: </label>
            <input
              className="w-full rounded-md pl-2"
              placeholder="Descripción"
              value={descrip}
              onChange={(e) => setDescrip(e.target.value)}
              required
            />
            <br />
            <label>Iva: </label>
            <br />
            <input
              name="iva"
              type="radio"
              value={0}
              onChange={handleOptionChange}
              checked={selectedOption === "0"}
            />
            <label> 0% </label>
            <input
              name="iva"
              type="radio"
              value={5}
              onChange={handleOptionChange}
              checked={selectedOption === "5"}
            />
            <label> 5% </label>
            <input
              name="iva"
              type="radio"
              value={10}
              onChange={handleOptionChange}
              checked={selectedOption === "10"}
              required
            />
            <label> 10% </label>
            <br />
            <label>Categoría: </label>
            <select
              className="w-full rounded-md pl-2 "
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Selecciona una categoría --
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
            <br />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={0}
              hidden
            />
            <br />
          </div>
          <button
            className="text-gray-300 self-center text-center px-4 h-8 rounded backdrop-blur bg-green-800 transition hover:bg-green-900"
            type="submit"
          >
            Agregar Producto
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
