Tumblr::Application.routes.draw do
  
  root to: 'sessions#new'
  resources :users
  resource  :session, :only => [:new, :create, :destroy]
  get '/dashboard', to: 'users#show', as: "dashboard"
  get '/march-cohort', to: 'users#cohort'
  namespace :api, :defaults => { :format => :json } do
    resources :posts
    resources :pictures, :only => [:create]
    resources :subscriptions, :only => [:create, :destroy]
    resources :users, :only => [:show, :update]
  end 
  
  get ':username/post/:post_title', to: 'blogs#post'
  get ':username/page/:page_title', to: 'blogs#page'
  get ':username', to: 'blogs#index'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
