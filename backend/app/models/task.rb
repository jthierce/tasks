class Task < ApplicationRecord
  validates :title, presence: true, allow_blank: false

  enum :status, { pending: 0, completed: 1 }

  belongs_to :user
end
