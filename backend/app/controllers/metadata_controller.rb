class MetadataController < ApplicationController
  def index
    render json: { task_status: Task.statuses.keys }
  end
end
