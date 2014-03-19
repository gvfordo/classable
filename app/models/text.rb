# == Schema Information
#
# Table name: texts
#
#  id         :integer          not null, primary key
#  post_id    :integer
#  post_text  :text
#  created_at :datetime
#  updated_at :datetime
#

class Text < ActiveRecord::Base
  
  validates :post_id, :presence => true
  
  belongs_to :post

end
