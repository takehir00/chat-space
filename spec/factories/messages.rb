FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    #image File.open("#{Rails.root}/public/images/river2.jpeg")
    user
    group
  end
end
