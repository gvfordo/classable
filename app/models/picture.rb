# == Schema Information
#
# Table name: pictures
#
#  id                 :integer          not null, primary key
#  imageable_id       :integer
#  imageable_type     :string(255)
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  image_updated_at   :datetime
#  created_at         :datetime
#  updated_at         :datetime
#

class Picture < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
  
  has_attached_file :image, :styles => {
    :large => "750x750>",
    :medium => "250x250>",
    :small => "100x100#"
  }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  
  def to_builder
      Jbuilder.new do |picture|
        picture.small_url self.image.url(:small)
        picture.medium_url self.image.url(:medium)
        picture.large_url self.image.url(:large)
      end
    end
end
