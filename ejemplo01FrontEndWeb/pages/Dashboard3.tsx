//PARA EDITAR, ELIMINAR
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

function Dashboard3() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Producto 1", price: 100.0 },
    { id: 2, name: "Producto 2", price: 200.0 },
    { id: 3, name: "Producto 3", price: 300.0 },
  ]);

  const [newProduct, setNewProduct] = useState<Product | null>(null); // Estado para producto nuevo o en edición
  const [editingId, setEditingId] = useState<number | null>(null); // ID del producto en edición

  // Agregar producto
  const handleCreate = () => {
    if (newProduct && newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct(null);
    }
  };

  // Eliminar producto
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Editar producto
  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setNewProduct(product);
      setEditingId(id);
    }
  };

  const handleSaveEdit = () => {
    if (newProduct && editingId !== null) {
      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...newProduct, id: editingId } : product
        )
      );
      setNewProduct(null);
      setEditingId(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard 3: Gestión de Productos</h1>

      {/* Lista de productos */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Precio</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>${product.price.toFixed(2)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleEdit(product.id)}
                  style={{
                    padding: "5px 10px",
                    marginRight: "5px",
                    backgroundColor: "#FFC107",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#DC3545",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar o editar productos */}
      <div style={{ marginTop: "20px" }}>
        <h2>{editingId ? "Editar Producto" : "Crear Producto"}</h2>
        <label>
          Nombre:
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
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </label>
        <br />
        <label>
          Precio:
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
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </label>
        <br />
        <button
          onClick={editingId ? handleSaveEdit : handleCreate}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: editingId ? "#FFC107" : "#28A745",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Guardar Cambios" : "Crear Producto"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setNewProduct(null);
            }}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#6C757D",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard3;
