'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from('users').select('*');
    setUsers(data || []);
  };

  const createUser = async () => {
    await supabase.from('users').insert([{ name, email }]);
    fetchUsers();
    setName('');
    setEmail('');
  };
//test 
  const updateUser = async (id: string, name: string, email: string) => {
    await supabase.from('users').update({ name, email }).eq('id', id);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await supabase.from('users').delete().eq('id', id);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="p-2 border rounded mr-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded mr-2"
        />
        <button onClick={createUser} className="p-2 bg-blue-500 text-white rounded">
          Crear Usuario
        </button>
      </div>
      <ul>
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
              className="p-2 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
