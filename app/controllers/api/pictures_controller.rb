class Api::PicturesController < ApplicationController
  before_action :authenticate
  
  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render :json => @picture
    else
      render :json => @picture.errors.full_messages
    end
  end
  
  
  def picture_params
    params.require(:picture).permit(:image)
  end
end
