require 'rails_helper'

describe Task, type: :model do
  let(:user) { User.create!(email: 'test@example.com', password: 'password') }

  describe '.new' do
    context 'when provided with valid data' do
      it 'is valid' do
        task = Task.new(title: 'Test Task', status: :pending, user: user)
        expect(task).to be_valid
      end

      context 'when the title is missing' do
        it 'is not valid' do
          task = Task.new(status: :pending, user: user)
          expect(task).to_not be_valid
          expect(task.errors[:title]).to include("can't be blank")
        end
      end

      context 'when the status is invalid' do
        it 'is not valid' do
          expect { Task.new(title: 'Test Task', status: :invalid_status, user: user) }.to raise_error(ArgumentError)
        end
      end
    end
  end

  describe '#update' do
    let(:task) { user.tasks.create(title: 'Initial Task', status: :pending) }

    context 'when provided with valid data' do
      it 'updates the title successfully' do
        task.update!(title: 'Updated Task')
        expect(task.title).to eq('Updated Task')
      end

      it 'updates the status successfully' do
        task.update!(status: :completed)
        expect(task.status).to eq('completed')
      end
    end

    context 'when provided with invalid data' do
      it 'raises an error when updating to an invalid status' do
        expect { task.update!(status: :invalid_status) }.to raise_error(ArgumentError)
      end

      it 'is not valid when updating with an empty title' do
        expect { task.update!(title: '') }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
