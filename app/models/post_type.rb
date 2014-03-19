# == Schema Information
#
# Table name: post_types
#
#  id         :integer          not null, primary key
#  type_name  :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class PostType < ActiveRecord::Base

  validates :type_name, :presence => true
  
  has_many :posts

end
