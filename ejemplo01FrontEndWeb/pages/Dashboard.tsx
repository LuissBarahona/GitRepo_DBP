import React, { useEffect, useState } from "react";
// import { GetItemsPaginacion } from "./Api"; // Comenté la importación de la API

interface Product {
  id: string;
  name: string;
  price: number;
}

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const limit = 10;

  // Datos de prueba
  const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Producto ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
  }));

  // Función para cargar los productos simulados
  async function fetchProducts(nextKey?: string) {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      // Simular una llamada a la API con datos de prueba
      const startIndex = nextKey ? parseInt(nextKey) : 0;
      const data = mockData.slice(startIndex, startIndex + limit);

      setProducts((prevProducts) => [...prevProducts, ...data]);
      const newLastKey = startIndex + limit < mockData.length ? (startIndex + limit).toString() : null;
      setLastKey(newLastKey);
      setHasMore(!!newLastKey);
    } catch (error) {
      console.error("Error al obtener los productos simulados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Cargar la primera página al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard de Productos</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                ${product.price.toFixed(2)}
              </td>
            </tr>
          ))}
          {products.length === 0 && !isLoading && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "8px" }}>
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isLoading && <p>Cargando productos...</p>}
      {!isLoading && hasMore && (
        <button
          onClick={() => fetchProducts(lastKey || undefined)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cargar más
        </button>
      )}
      {!hasMore && <p>No hay más productos para mostrar.</p>}
    </div>
  );
}

export default Dashboard;
