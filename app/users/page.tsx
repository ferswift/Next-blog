/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { db } from "@/Firebase/FireBaseConfig";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { User } from "@/Types/User";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const list: User[] = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
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

  return (
    <>
      <h1>Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
        </div>
      ))}
    </>
  );
}
