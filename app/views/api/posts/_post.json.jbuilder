json.(post, :id, :custom_url, :type, :source_link, :publish_date,
      :quote, :title, :post_text)

json.author do
  json.username post.user.username
end

if(post.type == 'Image')
  json.pictures post.pictures do |picture|
    json.small_url picture.image.url(:small)
    json.medium_url picture.image.url(:medium)
    json.large_url picture.image.url(:large)
  end
end