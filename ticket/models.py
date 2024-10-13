import uuid

from django.db import models
from django.contrib.auth.validators import UnicodeUsernameValidator


class User(models.Model):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        'username',
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
        validators=[username_validator],
        error_messages={
            'unique': "A user with that username already exists.",
        },
    )
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True)


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ticket_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    origin = models.CharField(null=False, max_length=255)
    destination = models.CharField(null=False, max_length=255)
    departure_date = models.DateTimeField(null=False)
    return_date = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    booked = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created',]

    def __str__(self):
        return f'{self.user.email}-{self.ticket_id}'
