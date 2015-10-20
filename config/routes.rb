Rails.application.routes.draw do
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create, :show, :index]
  namespace :api, defaults: {format: :json} do
    resources :speeches, :only => [:new, :create, :show, :index, :destroy, :update] do
      get "search", on: :collection
    end
    resources :comments, :only => [:new, :create, :show, :index, :destroy]
    resources :votes, :only => [:create, :update, :destroy]
    resources :annotations, :only => [:new, :create, :show, :index, :destroy, :update]
  end

  root :to => "users#new"

  get '/home', to: "static_pages#home"
end
