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

  validates :user_id, :type, :presence => true
  belongs_to :user
  has_many :pictures, as: :imageable
  validate :fix_custom_url
  
  
  private
  
  def fix_custom_url
    if self.custom_url && self.custom_url.length > 0
      if self.custom_url[0] == "/"
        self.custom_url = self.custom_url[1..-1]
      end
    end
  end
  

end
