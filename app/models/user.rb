# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  admin           :boolean          default(FALSE)
#

class User < ActiveRecord::Base
  attr_reader :password
  
  validates :username, :email, :password_digest, :session_token, :presence => true
  validates :username, :email, :uniqueness => true
  before_validation :ensure_session_token
  validate :name_not_reserverd
  has_many :posts
  
  has_many  :subscriptions,
            :primary_key => :id,
            :foreign_key => :subscriber_id,
            :class_name => "Subscription"
  
  
  has_many  :subscribers,
            :primary_key => :id,
            :foreign_key => :subscribee_id,
            :class_name => "Subscription"
            
  has_many :subscription_users, :through => :subscriptions, :source => :subscribee
  has_many :subscription_posts, :through => :subscription_users, :source => :posts
  
  has_many :subscribed_users, :through => :subscribers, :source => :subscriber
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end
  
  def self.find_by_credentials(params)
    user = User.find_by(:email => params[:user])
    if user && user.is_password?(params[:password])
      return user
    end
    user = User.find_by(:username => params[:user])
    if user && user.is_password?(params[:password])
      return user
    end
    nil
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
  
  def password=(pt)
    @password = pt
    self.password_digest = BCrypt::Password.create(pt)
  end
  
  def is_password?(pt)
    BCrypt::Password.new(self.password_digest).is_password?(pt)
  end
  
  
  private
  
  def name_not_reserverd
    reserved_names = ['admin', 'assets', 'about', 'about-us', 'contact', 'api', 'dashboard', 
      'tos', 'terms-of-service', 'themes', 'signup', 'login', 'session', 'post',
      'blog', 'feed', 'user', 'users', 'picture', 'image']
      
    if reserved_names.include?(self.username.downcase)
      errors.add(:username, "is not an allowed username.")
    end
  end
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
