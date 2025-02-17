Rails.application.routes.draw do
  resources :tasks
  get 'metadata', to: 'metadata#index'
end
