class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :subscriber_id
      t.integer :subscribee_id
      
      t.timestamps
    end
    
    add_index :subscriptions, :subscriber_id
    add_index :subscriptions, :subscribee_id
  end
end
