'use client';

import { User } from '@/types/User';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import Modal from '@/components/Modal';

interface Props {
  user: User;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: Omit<User, 'id'>) => void;
}

export default function UserCard({ user, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleUpdate = () => {
    if (name && email) {
      onUpdate(user.id, { name, email });
      setEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center p-4 bg-white shadow rounded"
    >
      {editing ? (
        <div className="flex-1 mr-4 space-y-2">
          <input
            type="text"
            value={name}
            className="w-full px-2 py-1 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            className="w-full px-2 py-1 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex-1">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}

      <div className="flex gap-2">
        {editing ? (
          <>
            <button onClick={handleUpdate} className="text-green-600">
              <Check className="w-5 h-5" />
            </button>
            <button onClick={() => setEditing(false)} className="text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} className="text-blue-600">
              <Pencil className="w-5 h-5" />
            </button>
            <button onClick={() => setConfirmOpen(true)} className="text-red-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(user.id);
          setConfirmOpen(false);
        }}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${user.name}?`}
      />
    </motion.div>
  );
}