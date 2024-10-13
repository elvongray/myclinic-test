from rest_framework import generics

from ticket.serializers import TicketSerializer, UserSerializer
from ticket.models import Ticket, User


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TicketListCreateView(generics.ListCreateAPIView):
    serializer_class = TicketSerializer

    def get_queryset(self):
        username = self.kwargs.get('username')

        if Ticket.objects.filter(user__username=username):
            return Ticket.objects.filter(user__username=username)
        elif not User.objects.filter(username=username):
            User.objects.create(username=username)

        return Ticket.objects.none()

    def perform_create(self, serializer):
        user = User.objects.get(username=self.kwargs.get('username'))
        serializer.save(
            user_id=user.id
        )


class TicketUpdateView(generics.RetrieveUpdateAPIView):
    lookup_url_kwarg = 'ticket_id'
    lookup_field = 'ticket_id'
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
