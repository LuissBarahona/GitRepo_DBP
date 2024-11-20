import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from './Chat';
import Profile from './Profile';
import Cards from '../components/Cards'; // Importar Cards
import '../src/Inicio2.css'; // Archivo de estilos CSS para Inicio2

const Inicio3: React.FC = () => {
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Categoría activa

  const restaurants = [
    { name: "Restaurante A", rating: 5, category: "CATEGORÍA 1" },
    { name: "Restaurante B", rating: 4, category: "CATEGORÍA 2" },
    { name: "Restaurante C", rating: 3, category: "CATEGORÍA 3" },
    // Agregar más restaurantes según sea necesario
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category); // Activar la categoría seleccionada
  };

  const closePopup = () => {
    setActiveCategory(null); // Cerrar la ventana flotante
  };

  return (
    <div className="inicio-container">
      <div className={`main-content ${showChat || showProfile ? 'half-width' : ''}`}>
        {/* Mensaje y botones de categorías */}
        <div className="post-form2">
          <div className="category-section">
            <h4>RECOMIENDA RESTAURANTES EN FUNCIÓN A UNA CATEGORÍA</h4>
            <div className="category-buttons">
              <button onClick={() => handleCategoryClick("CATEGORÍA 1")}>
                CATEGORÍA 1: Celebración de aniversario/petición
              </button>
              <button onClick={() => handleCategoryClick("CATEGORÍA 2")}>
                CATEGORÍA 2: Celebración de cumpleaños
              </button>
              <button onClick={() => handleCategoryClick("CATEGORÍA 3")}>
                CATEGORÍA 3: Ruptura Amorosa
              </button>
              <button onClick={() => handleCategoryClick("CATEGORÍA 4")}>
                CATEGORÍA 4: Graduación
              </button>
              <button onClick={() => handleCategoryClick("CATEGORÍA 5")}>
                CATEGORÍA 5: Ambiente Cristiano
              </button>
              <button onClick={() => handleCategoryClick("CATEGORÍA 6")}>
                CATEGORÍA 6: Cena de gala/negocios
              </button>
            </div>
          </div>
        </div>

        {/* Ventana flotante con Cards */}
        {activeCategory && (
          <div className="popup">
            <div className="popup-header">
              <h3>{activeCategory}</h3>
              <button className="close-button" onClick={closePopup}>
                ×
              </button>
            </div>
            <Cards
              restaurants={restaurants.filter(
                (restaurant) => restaurant.category === activeCategory
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inicio3;
