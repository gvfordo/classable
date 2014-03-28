class AddIndexCustomUrlToPosts < ActiveRecord::Migration
  def change
    add_index :posts, :custom_url
  end
end
