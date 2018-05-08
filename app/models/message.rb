class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :avatar, AvatarUploader
end
