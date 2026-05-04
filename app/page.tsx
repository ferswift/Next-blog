"use client";

import { db } from "@/Firebase/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState<string>("");

  const handleSaveUser = async () => {
    if (!userName.trim()) {
      return alert("Por favor, insira um nome de usuário válido.");
    }

    try {
      await addDoc(collection(db, "users"), {
        name: userName,
        createdAt: new Date(),
      });

      setUserName("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>

      <h1>Enviar Usuários</h1>
      <input
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
        Salvar no Firestore
      </button>
    </div>
  );
}
