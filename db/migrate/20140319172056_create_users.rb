class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :session_token

      t.timestamps
    end
    
    add_index :users, :username
    add_index :users, :email
    add_index :users, :session_token
  end
end
