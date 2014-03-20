json.(post, :id, :custom_url, :source_link, :publish_date)

json.text do
  json.title post.text.title
  json.text post.text.post_text
end