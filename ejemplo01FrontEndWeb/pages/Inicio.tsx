import React, { useEffect, useState } from "react";
import useToken from "../hooks/useToken";

function Inicio() {
  const { getToken } = useToken();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = getToken();
    if (user) {
      setRole(user.role);
    }
  }, [getToken]);

  return (
    <div className="p-4">
      {role === "admin" ? (
        <h1>Bienvenido, administrador</h1>
      ) : (
        <h1>Bienvenido, cliente</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Dashboard de productos */}
        {/* Iterar y mostrar productos */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded p-2">
            <p>Producto {item}</p>
            {role === "admin" && (
              <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
