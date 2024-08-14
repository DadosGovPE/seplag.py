import { useEffect, useState } from "react";
import { api } from "../../service/api";
import UserInterface from "../../interfaces/User";

export default function Gerencia() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/inscritos");
        setUsersList(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de inscritos:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <ul>
        {usersList.map((user:UserInterface, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
