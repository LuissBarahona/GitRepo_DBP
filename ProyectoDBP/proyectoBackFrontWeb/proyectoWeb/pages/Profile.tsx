import React from "react";
import { useParams } from "react-router-dom";

const Perfil: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const mockUser = {
    name: "Jimenar",
    email: "luiss.barahona@utec.edu.pe",
    bio: "Software developer with 10 years of experience.",
    userType: "INFLUENCER",
    password: "securepassword123",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Perfil de {mockUser.name}</h2>
      <p><strong>Email:</strong> {mockUser.email}</p>
      <p><strong>Biografía:</strong> {mockUser.bio}</p>
      <p><strong>Tipo de Usuario:</strong> {mockUser.userType}</p>
    </div>
  );
};

export default Perfil;
