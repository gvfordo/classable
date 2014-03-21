# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  type         :string(255)      not null
#  custom_url   :string(255)
#  source_link  :string(255)
#  quote        :string(1000)
#  link         :string(500)
#  media_url    :string(500)
#  title        :string(255)
#  post_text    :text
#  publish_date :datetime
#  created_at   :datetime
#  updated_at   :datetime
#



class Post < ActiveRecord::Base
  # POST_TYPES = {
  #   "TextPost" => TextPost,
  #   "QuotePost" => QuotePost,
  #   "ImagePost" => ImagePost,
  #   "LinkPost" => LinkPost,
  #   "ChatPost" => ChatPost,
  #   "AudioPost" => AudioPost,
  #   "VideoPost" => VideoPost
  # }
  
  
  validates :user_id, :type, :presence => true
  
  belongs_to :user
  
  # def self.model_for(type) 
  #   POST_TYPES[type]
  # end

end
