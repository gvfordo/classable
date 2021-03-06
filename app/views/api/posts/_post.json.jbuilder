json.(post, :id, :custom_url, :type, :source_link, :media_url, :publish_date, 
      :link, :quote, :title, :post_text)

json.author do
  json.username post.user.username
  json.avatar post.user.avatar.url(:thumb)
  json.id post.user.id
end

if(post.type == 'Image')
  json.pictures post.pictures do |picture|
    json.small_url picture.image.url(:small)
    json.medium_url picture.image.url(:medium)
    json.large_url picture.image.url(:large)
  end
end