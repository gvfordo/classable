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
#

class User < ActiveRecord::Base
  attr_reader :password
  
  validates :username, :email, :password_digest, :session_token, :presence => true
  validates :username, :email, :uniqueness => true
  validate :ensure_session_token
  
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
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
