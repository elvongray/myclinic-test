from rest_framework import routers

from ticket.views import TicketView

router = routers.DefaultRouter()

router.register(r'tickets', TicketView, basename="tickets")
urlpatterns = router.urls
