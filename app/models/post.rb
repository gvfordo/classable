# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  post_type    :string(255)      not null
#  custom_url   :string(255)
#  source_link  :string(255)
#  publish_date :datetime
#  created_at   :datetime
#  updated_at   :datetime
#  quote        :string(1000)
#  media_link   :string(500)
#

class Post < ActiveRecord::Base
  POST_TYPES = {
    "TextPost" => TextPost,
    "QuotePost" => QuotePost,
    "ImagePost" => ImagePost,
    "LinkPost" => LinkPost,
    "ChatPost" => ChatPost,
    "AudioPost" => AudioPost,
    "VideoPost" => VideoPost
  }
  
  
  validates :user_id, :post_type, :presence => true
  
  belongs_to :user
  has_one :text, :inverse_of => :post
  
  def self.model_for(type) 
    POST_TYPES[type]
  end

end
