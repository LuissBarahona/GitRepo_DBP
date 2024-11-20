import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from './Chat';
import Profile from './Profile';
import '../src/Inicio2.css'; // Archivo de estilos CSS para Inicio2

const Inicio2: React.FC = () => {
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [post, setPost] = useState({
    userId: 12,
    image: "",
    content: "",
    createdDate: new Date().toISOString(),
    status: "ACTIVE",
    title: "",
  });

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo post creado:", post);
    alert("¡Post creado con éxito!");
    setPost({
      userId: 12,
      image: "",
      content: "",
      createdDate: new Date().toISOString(),
      status: "ACTIVE",
      title: "",
    });
  };

  return (
    <div className="inicio-container">
      <div className={`main-content ${showChat || showProfile ? 'half-width' : ''}`}>
        <nav className="navbar">
          {/* Logo FoodTail */}
          <div className="logo" onClick={() => navigate("/")}>
            FoodTail
          </div>

          {/* Buscador */}
          <input type="text" placeholder="Buscar usuarios..." className="search-input" />

          {/* Iconos */}
          <div className="icon-container">
            {/* Casita */}
            <div className="icon" onClick={() => setShowPostForm((prev) => !prev)}>
              <span role="img" aria-label="home">🏠</span>
            </div>

            {/* Iconos vacíos */}
            <span role="img" aria-label="icon">📺</span>
            <span role="img" aria-label="icon">🎮</span>

            {/* Messenger */}
            <div className="icon" onClick={() => setShowChat((prev) => !prev)}>
              <span role="img" aria-label="messenger">💬</span>
            </div>

            {/* Perfil */}
            <div className="icon" onClick={() => setShowProfile((prev) => !prev)}>
              <span role="img" aria-label="perfil">👤</span>
            </div>
          </div>
        </nav>

        {/* Formulario para crear un nuevo post */}
        {showPostForm && (
          <div className="post-form">
            <h3>Crear un nuevo post</h3>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label>
                  Título:
                  <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handlePostChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Contenido:
                  <textarea
                    name="content"
                    value={post.content}
                    onChange={handlePostChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  URL de la imagen:
                  <input
                    type="text"
                    name="image"
                    value={post.image}
                    onChange={handlePostChange}
                  />
                </label>
              </div>
              <button type="submit" className="submit-button">Publicar</button>
            </form>
          </div>
        )}

        <div className="content-placeholder">
          {showPostForm ? "Aquí se muestra el formulario para crear un post." : "Haz clic en la casita para crear un post."}
        </div>
      </div>

      {/* Ventana flotante del chat */}
      {showChat && (
        <div className="chat-popup">
          <Chat />
        </div>
      )}

      {/* Ventana flotante del perfil */}
      {showProfile && (
        <div className="profile-popup">
          <Profile username="NombreUsuario" email="usuario@example.com" onClose={() => setShowProfile(false)} />
        </div>
      )}
    </div>
  );
};

export default Inicio2;