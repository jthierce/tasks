class TasksController < ApplicationController
  before_action :sanitize_params, only: %i[create update]

  def index
    @tasks = current_user.tasks
    render json: @tasks
  end

  def show
    @task = current_user.tasks.find(params[:id])
    render json: @task
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    head :no_content
  end

  private

  def sanitize_params
    params[:task][:status] = Task.statuses[params[:task][:status]]
  end

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end
end
