class RenameAvatarColumnToImage < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :avatar, :image
  end
end
