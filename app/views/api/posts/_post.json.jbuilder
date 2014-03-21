json.(post, :id, :custom_url, :type, :source_link, :publish_date,
      :quote, :title, :post_text)

json.author do
  json.username post.user.username
end