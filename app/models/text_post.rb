class TextPost < Post
  validates :title, :text, :presence => true
end
