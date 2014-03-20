json.(post, :id, :custom_url, :post_type_id, :source_link, :publish_date)

json.text do
  json.title post.text.title
  json.text post.text.post_text
end

json.author do
  json.username post.user.username
end