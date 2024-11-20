//Dashboard4 con autenticación
import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "./useToken";

interface Product {
  id: number;
  name: string;
  price: number;
}

const BACKEND_URL = "https://tu-api-url.com";

function Dashboard3() {
  const { getToken } = useToken();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = getToken()?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleCreate = async () => {
    if (newProduct && newProduct.name && newProduct.price) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/products`,
          newProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts([...products, response.data]);
        setNewProduct(null);
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setNewProduct(product);
      setEditingId(id);
    }
  };

  const handleSaveEdit = async () => {
    if (newProduct && editingId !== null) {
      try {
        const response = await axios.put(
          `${BACKEND_URL}/products/${editingId}`,
          newProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(
          products.map((product) =>
            product.id === editingId ? response.data : product
          )
        );
        setNewProduct(null);
        setEditingId(null);
      } catch (error) {
        console.error("Error al editar producto:", error);
      }
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard 3: Gestión de Productos</h1>

      {/* Lista de productos */}
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-gray-700">
              <td className="border border-gray-300 px-4 py-2 text-center">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">${product.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar o editar productos */}
      <div className="mt-6 bg-gray-50 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingId ? "Editar Producto" : "Crear Producto"}
        </h2>
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Nombre</span>
            <input
              type="text"
              value={newProduct?.name || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                  price: newProduct?.price || 0,
                } as Product)
              }
              className="p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium text-gray-700">Precio</span>
            <input
              type="number"
              value={newProduct?.price || ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value) || 0,
                  name: newProduct?.name || "",
                } as Product)
              }
              className="p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex space-x-4">
            <button
              onClick={editingId ? handleSaveEdit : handleCreate}
              className={`px-4 py-2 rounded ${
                editingId ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {editingId ? "Guardar Cambios" : "Crear Producto"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewProduct(null);
                }}
                className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard3;
