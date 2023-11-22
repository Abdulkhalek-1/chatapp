from django.core.exceptions import ValidationError
from django.test import TestCase
from .models import Reaction

class ReactionModelTestCase(TestCase):

   def test_valid_emoji(self):
      valid_emoji = "🐦‍🔥"
      obj = Reaction.objects.create(emoji=valid_emoji)
      retrieved_obj = Reaction.objects.get(id=obj.id)
      self.assertEqual(retrieved_obj.emoji, valid_emoji)

   def test_invalid_emoji(self):
      invalid_emoji = "🐦‍🔥"
      with self.assertRaises(ValidationError):
         Reaction.objects.create(emoji=invalid_emoji)

   def test_empty_emoji(self):
      empty_emoji = '🐦‍🔥'
      with self.assertRaises(ValidationError):
         Reaction.objects.create(emoji=empty_emoji)
