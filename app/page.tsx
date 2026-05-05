"use client";

import { db } from "@/Firebase/FireBaseConfig";
import { User } from "@/Types/User";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Editar usuário
  const handleEdit = (user: User) => {
    setUserName(user.name);
    setEditingUserId(user.id);
  };

  // Criar OU atualizar usuário
  const handleSaveUser = async () => {
    if (!userName.trim()) {
      return alert("Por favor, insira um nome de usuário válido.");
    }

    try {
      if (editingUserId) {
        // UPDATE
        const userRef = doc(db, "users", editingUserId);

        await updateDoc(userRef, {
          name: userName,
        });

        setEditingUserId(null);
      } else {
        // CREATE
        await addDoc(collection(db, "users"), {
          name: userName,
          createdAt: new Date(),
        });
      }

      setUserName(""); // limpa input
      fetchUsers(); // atualiza lista
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //  Buscar usuários
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const list: User[] = [];

      snapshot.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...(docItem.data() as Omit<User, "id">),
        });
      });

      setUsers(list);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Deletar users
  const handleDelete = async (id: string) => {
    try {
      const useRef = doc(db, "users", id);

      await deleteDoc(useRef);

      if (editingUserId === id) {
        setEditingUserId(null);
        setUserName("");
      }

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-10">
      <h1>Users</h1>

      {users.map((user) => (
        <div key={user.id} className="flex flex-col">
          <p>Name: {user.name}</p>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}

      <input
        className="text-center p-2 border-2 border-gray-400 rounded-md"
        type="text"
        placeholder="Digite um usuário"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <button
        className="mt-10 p-10 border-2 border-white rounded-md"
        disabled={!userName.trim()}
        onClick={handleSaveUser}
      >
        {editingUserId ? "Atualizar usuário" : "Salvar usuário"}
      </button>
    </div>
  );
}
