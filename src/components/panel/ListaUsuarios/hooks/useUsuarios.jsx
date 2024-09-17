import { useState, useEffect } from "react";
import { fetchUsers } from "@/components/panel/ListaUsuarios/services/FetchUsers";
import { filterUsers } from "@/components/panel/ListaUsuarios/utils/buscador";

const useUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const result = filterUsers(users, searchTerm);
    setFilteredUsers(result);
  }, [searchTerm, users]);

  return { filteredUsers, loading, searchTerm, setSearchTerm };
};

export default useUsuarios;
