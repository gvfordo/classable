# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  post_type_id :integer          not null
#  custom_url   :string(255)
#  source_link  :string(255)
#  publish_date :datetime
#  created_at   :datetime
#  updated_at   :datetime
#

class Post < ActiveRecord::Base
  validates :user_id, :post_type_id, :presence => true
  
  belongs_to :user
  
  has_one :text, :inverse_of => :post
  validates_associated :text

end
