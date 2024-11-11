// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from("users").select("*");
    setUsers(data || []);
  };

  const createUser = async () => {
    await supabase.from("users").insert([{ name, email }]);
    fetchUsers();
    setName("");
    setEmail("");
  };

  const updateUser = async (id: string, name: string, email: string) => {
    await supabase.from("users").update({ name, email }).eq("id", id);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await supabase.from("users").delete().eq("id", id);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <aside className="w-1/4 p-4 bg-gray-800 text-white">
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-lg font-bold hover:text-teal-400">
            Home
          </Link>
          <Link href="/otra-pagina" className="text-lg font-bold hover:text-teal-400">
            Otra Página
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-slate-200 rounded shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Crear Usuarios</h1>
          <div className="mb-10 text-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              className="p-2 border rounded mr-2 text-black-700"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border rounded mr-2"
            />
            <button
              onClick={createUser}
              className="p-2 bg-teal-400 text-white rounded"
            >
              Crear Usuario
            </button>
          </div>

          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Buscar Usuarios</h1>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o email"
              className="p-2 border rounded w-full mb-4"
            />
            <ul className="list-disc list-inside">
              {filteredUsers.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Editar y Eliminar Usuarios</h1>
            <ul className="list-disc list-inside">
              {users.map((user) => (
                <li key={user.id} className="mb-2">
                  <input
                    type="text"
                    defaultValue={user.name}
                    onBlur={(e) => updateUser(user.id, e.target.value, user.email)}
                    className="p-2 border rounded mr-2"
                  />
                  <input
                    type="email"
                    defaultValue={user.email}
                    onBlur={(e) => updateUser(user.id, user.name, e.target.value)}
                    className="p-2 border rounded mr-2"
                  />
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-red-400 text-white rounded"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
