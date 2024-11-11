// src/app/otra-pagina.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

export default function OtraPagina() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <aside className="w-1/4 p-4 bg-gray-800 text-white">
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-lg font-bold hover:text-teal-400">
            Página Actual
          </Link>
          <Link href="/otra-pagina" className="text-lg font-bold hover:text-teal-400">
            Otra Página
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="p-8 bg-white rounded shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Otra Página</h1>
          
          <div className="mb-10 text-center">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Añadir nuevo elemento"
              className="p-2 border rounded mr-2 text-black-700"
            />
            <button
              onClick={addItem}
              className="p-2 bg-teal-400 text-white rounded"
            >
              Añadir
            </button>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-center">Lista de Elementos</h2>
            <ul className="list-disc list-inside">
              {items.map((item, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  {item}
                  <button
                    onClick={() => deleteItem(index)}
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
