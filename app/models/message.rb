class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :avatar, AvatarUploader

  validates :body_or_avatar, presence: true

  private
    def body_or_avatar
      body.presence or avatar.presence
    end
end
