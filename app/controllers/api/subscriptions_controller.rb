class Api::SubscriptionsController < ApplicationController
  before_action :authenticate


  def create
    @new_subscription = current_user.subscriptions.new(subscription_params)
    if @new_subscription.save
      render :json => @new_subscription
    else
      render :json => @new_subscription.errors.full_messages
    end
  end
  
  def destroy
    
  end
  
  private
  
  def subscription_params
    params.require(:subscription).permit(:subscribee_id)
  end
  
end
