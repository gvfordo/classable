# == Schema Information
#
# Table name: subscriptions
#
#  id            :integer          not null, primary key
#  subscriber_id :integer
#  subscribee_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Subscription < ActiveRecord::Base

  validates :subscriber_id, :subscribee_id, :presence => true
  validates :subscriber_id, :uniqueness => { :scope => :subscribee_id } 
  
  belongs_to  :subscriber,
              :primary_key => :id,
              :foreign_key => :subscriber_id,
              :class_name => "User"

  belongs_to  :subscribee,
              :primary_key => :id,
              :foreign_key => :subscribee_id,
              :class_name => "User"

end
