require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe 'GET #index' do
    let!(:task1) { Task.create!(title: 'Task 1') }
    let!(:task2) { Task.create!(title: 'Task 2') }

    it 'returns both tasks' do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to match_array([ task1.as_json, task2.as_json ])
    end
  end

  describe 'GET #show' do
    let(:task) { Task.create!(title: 'Existing Task') }

    it 'returns a success response' do
      get :show, params: { id: task.id }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    it 'creates a new task' do
      expect {
        post :create, params: { task: { title: 'New Task' } }
      }.to change(Task, :count).by(1)
    end
  end

  describe 'PUT #update' do
    let(:task) { Task.create!(title: 'Existing Task') }

    it 'updates the requested task' do
      put :update, params: { id: task.id, task: { title: 'Updated Task', status: "completed" } }
      task.reload
      expect(task.title).to eq('Updated Task')
      expect(task.status).to eq('completed')
    end
  end

  describe 'DELETE #destroy' do
    let!(:task) { Task.create!(title: 'Existing Task') }

    it 'destroys the requested task' do
      expect {
        delete :destroy, params: { id: task.id }
      }.to change(Task, :count).by(-1)
    end
  end
end
