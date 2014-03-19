class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.integer :post_id
      t.text :post_text
      t.timestamps
    end
    
    add_index :texts, :post_id
  end
end
