from rest_framework import serializers

from .models import Ticket, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'first_name', 'last_name', 'email',
        )


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = (
            'ticket_id', 'origin', 'destination',
            'departure_date', 'return_date', 'created',
            'booked',
        )
