require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let(:user) { User.create!(email: 'test@example.com', password: 'password') }

  before do
    sign_in user
  end

  describe 'GET #index' do
    let!(:task1) { user.tasks.create!(title: 'Task 1') }
    let!(:task2) { user.tasks.create!(title: 'Task 2') }

    it 'returns both tasks' do
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to match_array([ task1.as_json, task2.as_json ])
    end
  end

  describe 'GET #show' do
    let(:task) { user.tasks.create!(title: 'Existing Task') }

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
    let(:task) { user.tasks.create!(title: 'Existing Task') }

    it 'updates the requested task' do
      put :update, params: { id: task.id, task: { title: 'Updated Task', status: "completed" } }
      task.reload
      expect(task.title).to eq('Updated Task')
      expect(task.status).to eq('completed')
    end
  end

  describe 'DELETE #destroy' do
    let!(:task) { user.tasks.create!(title: 'Existing Task') }

    it 'destroys the requested task' do
      expect {
        delete :destroy, params: { id: task.id }
      }.to change(Task, :count).by(-1)
    end
  end
end
