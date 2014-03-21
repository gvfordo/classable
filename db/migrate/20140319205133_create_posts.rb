class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, :null => false
      t.string :post_type, :null => false
      t.string :custom_url
      t.string :source_link
      t.string :quote, :limit => 1000
      t.string :link, :limit => 500
      t.string :media_url, :limit => 500
      t.string :title
      t.text  :post_text
      t.datetime :publish_date

      t.timestamps
    end
    
    add_index :posts, :user_id
  end
end
