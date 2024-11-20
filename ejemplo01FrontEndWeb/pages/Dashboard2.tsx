//PARA GET /ITEM

import React, { useState } from "react";
import { GetItem } from "../src/Api"; // Asegúrate de que esta función esté correctamente implementada

interface Product {
  id: string;
  name: string;
  price: number;
}

function Dashboard2() {
  const [productId, setProductId] = useState<number | "">(""); // ID del producto ingresado
  const [product, setProduct] = useState<Product | null>(null); // Producto obtenido
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Error en la búsqueda

  // Función para buscar un producto
  const fetchProduct = async () => {
    if (productId === "") {
      setError("Por favor, ingrese un ID válido.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProduct(null); // Reinicia el estado anterior

    try {
      const data = await GetItem(Number(productId)); // Llamada al endpoint con el ID
      setProduct(data);
    } catch (error: any) {
      console.error("Error al obtener el producto:", error);
      setError("No se encontró el producto o hubo un error en la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard 2: Buscar Producto</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          <span>Ingrese el ID del producto:</span>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value === "" ? "" : Number(e.target.value))}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </label>
        <button
          onClick={fetchProduct}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {isLoading && <p>Cargando producto...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {product && (
        <div style={{ marginTop: "20px" }}>
          <h2>Detalles del Producto</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>ID</th>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.id}</td>
              </tr>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Nombre</th>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
              </tr>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Precio</th>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>${product.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard2;
