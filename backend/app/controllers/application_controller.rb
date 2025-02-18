class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :controller_to_skip?

  rescue_from JWT::ExpiredSignature, with: :handle_expired_token
  rescue_from JWT::DecodeError, with: :handle_invalid_token

  private

  def handle_expired_token
    render json: { error: 'Token has expired' }, status: :unauthorized
  end

  def handle_invalid_token
    render json: { error: 'Invalid token' }, status: :unauthorized
  end

  def controller_to_skip?
    ["MetadataController"].include?(self.class.to_s)
  end
end
