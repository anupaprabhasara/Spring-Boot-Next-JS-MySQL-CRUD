'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { User } from '@/types/User';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    const response = await api.post('/users', user);
    setUsers((prev) => [...prev, response.data]);
  };

  const deleteUser = async (id: number) => {
    await api.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = async (id: number, updatedUser: Omit<User, 'id'>) => {
    const response = await api.put(`/users/${id}`, updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? response.data : u))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, addUser, deleteUser, updateUser };
}