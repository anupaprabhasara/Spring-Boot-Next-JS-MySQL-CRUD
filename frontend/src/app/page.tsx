'use client';

import { useUsers } from '@/hooks/useUsers';
import UserCard from '@/components/UserCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export default function Home() {
  const { users, loading, addUser, deleteUser, updateUser } = useUsers();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    addUser({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8 flex flex-col items-center"
    >
      <h1 className="text-4xl font-bold text-blue-800 mb-6">User Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6"
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl space-y-3"
        >
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={deleteUser}
              onUpdate={updateUser}
            />
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}