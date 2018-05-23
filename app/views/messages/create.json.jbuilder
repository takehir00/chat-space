json.body @message.body
json.id @message.id
json.image_url @message.image.url
json.user_name @message.user.name
json.created_at @message.created_at.to_s(:datetime)
