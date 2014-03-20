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
  
  validate :check_post_title
  validate :check_post_text
  
  belongs_to :post, :inverse_of => :text  
  
  private
  
  def check_post_text
    if self.post.post_type_id == 1
      if self.post_text.blank? 
        self.post.errors.add(:post_text, "can't be blank.")
      end
    end
  end
  
  def check_post_title
    if self.post.post_type_id == 1
      if self.title.blank? 
        self.post.errors.add(:title, "can't be blank.")
      end
    end
  end

end
