from rest_framework import serializers

from people.models import Person


class PeopleViewSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name")
    lastName = serializers.CharField(source="last_name")

    class Meta:
        model = Person
        fields = ("id", "firstName", "lastName")
