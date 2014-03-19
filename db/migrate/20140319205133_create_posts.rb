class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, :null => false
      t.integer :post_type_id, :null => false
      t.string :custom_url
      t.string :source_link
      t.datetime :publish_date

      t.timestamps
    end
    
    add_index :posts, :user_id
  end
end
