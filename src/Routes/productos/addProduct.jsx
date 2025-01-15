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
    console.log(form)
    if (Object.values(nombre).some((value) => value.trim() === "")) {
      alert("Todos los campos son obligatorios");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/products", {
        nombre: nombre,
        descrip: descrip,
        stock: form.stock.value,
        iva: selectedOption,
        categoria: selectedCategory
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
      <h1>Añadir producto</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre: </label>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br />
        <label>Descripción: </label>
        <input
          placeholder="Descripción"
          value={descrip}
          onChange={(e) => setDescrip(e.target.value)}
          required
        />
        <br />
        <label>Iva: </label>
        <input
          name="iva"
          type="radio"
          placeholder="Descripción"
          value={0}
          onChange={handleOptionChange}
          checked={selectedOption === "0"}
        />
        <label> 0%</label>
        <input
          name="iva"
          type="radio"
          placeholder="Descripción"
          value={5}
          onChange={handleOptionChange}
          checked={selectedOption === "5"}
        />
        <label> 5%</label>
        <input
          name="iva"
          type="radio"
          placeholder="Descripción"
          value={10}
          onChange={handleOptionChange}
          checked={selectedOption === "10"}
          required
        />
        <label> 10%</label>
        <br />
        <label>Categoría: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required>
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
        <button type="submit">Agregar Producto</button>
        <br />
      </form>
      <br />
      <a href="/Productos">
        <button>Regresar</button>
      </a>
    </div>
  );
}
