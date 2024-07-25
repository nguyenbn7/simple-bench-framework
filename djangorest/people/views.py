from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

from people.models import Person
from people.serializers import PeopleViewSerializer


@api_view(["GET"])
@renderer_classes([JSONRenderer])
def get_people(request: HttpRequest):
    return Response(PeopleViewSerializer(Person.objects.all(), many=True).data)
