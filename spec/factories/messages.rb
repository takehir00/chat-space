FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    avatar File.open("#{Rails.root}/public/images/forest.jpeg")
    user
    group
  end
end
