import { defineStore } from 'pinia'
import type { Task } from '@/models/taskTypes'
import { ref, type Ref } from 'vue'
import { createTask, deleteTask, updateTask, getTaskById, getTasks } from '@/api/taskApi'

export const useTaskStore = defineStore('tasks', () => {
  const tasks: Ref<Task[]> = ref([])

  const fetchTasks = async () => {
    tasks.value = await getTasks()
  }

  const fetchTask = async (taskId: number) => {
    return getTaskById(taskId)
  }

  const addTask = async (task: Task) => {
    tasks.value.push(await createTask(task))
  }

  const changeTask = async (task: Task) => {
    const index = tasks.value.findIndex((t) => t.id === task.id)
    tasks.value[index] = await updateTask(task)
  }

  const removeTask = async (taskId: number) => {
    await deleteTask(taskId)
    tasks.value = tasks.value.filter((t) => t.id !== taskId)
  }

  return { tasks, fetchTasks, fetchTask, addTask, changeTask, removeTask }
})
