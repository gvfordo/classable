# == Schema Information
#
# Table name: texts
#
#  id         :integer          not null, primary key
#  post_id    :integer
#  title      :string(255)
#  post_text  :text
#  created_at :datetime
#  updated_at :datetime
#

class Text < ActiveRecord::Base
  
  validates :post, :presence => true
  
  belongs_to :post, :inverse_of => :text

end
