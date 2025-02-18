<template>
  <div class="d-flex justify-space-between align-center pa-1">
    <h1>Task List</h1>
    <v-btn color="primary" @click="openAddModal">Add Task</v-btn>
  </div>

  <v-expansion-panels>
    <v-expansion-panel v-for="task in tasks" :key="task.id">
      <v-expansion-panel-title>
        <v-row>
          <v-col cols="11">
            <div class="font-weight-bold">{{ task.title }}</div>
          </v-col>
          <v-col cols="1">
            <div>{{ task.status }}</div>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <div>{{ task.description }}</div>
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" size="small" @click="openEditModal(task)" class="mr-2">Edit</v-btn>
          <v-btn color="error" size="small" @click="deleteTask(task.id)">Delete</v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-dialog v-model="showModal" max-width="500px" @after-leave="resetModal">
    <v-card>
      <v-card-title>
        <span class="headline">{{ currentTask.id ? 'Editing' : 'Create' }} task</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="saveTask">
          <v-text-field label="Title" v-model="currentTask.title" required></v-text-field>
          <v-select
            label="Status"
            v-model="currentTask.status"
            :items="metaData.task_status"
            required
          />
          <v-textarea label="Description" v-model="currentTask.description"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="saveTask"
          :disabled="!currentTask.status || !currentTask.title"
        >
          Save
        </v-btn>
        <v-btn color="secondary" @click="closeModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'
  import { useMainStore } from '@/stores/main'
  import type { Task } from '@/models/taskTypes'
  import { storeToRefs } from 'pinia'

  const mainStore = useMainStore()
  const { metaData } = storeToRefs(mainStore)

  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)

  let showModal = ref(false)
  let isEditing = ref(false)
  let currentTask: Ref<Task> = ref({ id: 0, title: '', description: '', status: '' })

  taskStore.fetchTasks()

  const openAddModal = () => {
    isEditing.value = false
    showModal.value = true
  }

  const openEditModal = (task: Task) => {
    isEditing.value = true
    currentTask.value = { ...task }
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const saveTask = () => {
    if (!currentTask.value.title) {
      alert('Title cannot be empty')
      return
    }
    if (isEditing.value) {
      taskStore.changeTask(currentTask.value)
    } else {
      taskStore.addTask(currentTask.value)
    }
    closeModal()
  }

  const deleteTask = (id: number) => {
    taskStore.removeTask(id)
  }

  const resetModal = () => {
    currentTask.value = { id: 0, title: '', description: '', status: '' }
  }
</script>

<style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
</style>
