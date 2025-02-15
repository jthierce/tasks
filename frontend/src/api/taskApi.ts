import type { Task } from '@/models/taskTypes';
import apiClient from './api';

export const getTasks = async (): Promise<Task[]> => (await apiClient.get('/tasks')).data;

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};