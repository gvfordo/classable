class Api::SubscriptionsController < ApplicationController
  before_action :authenticate


  def create
    @new_subscription = current_user.subscriptions.new(subscription_params)
    if @new_subscription.save
      user = @new_subscription.subscribee
      redirect_to "/#{user.username}"
    else
      render :json => @new_subscription.errors.full_messages
    end
  end
  
  def destroy
    subscription = current_user.subscriptions.find_by(:subscribee_id => subscription_params[:subscribee_id])
    user = subscription.subscribee
    subscription.destroy
    
    redirect_to "/#{user.username}"
  end
  
  private
  
  def subscription_params
    params.require(:subscription).permit(:subscribee_id)
  end
  
end
