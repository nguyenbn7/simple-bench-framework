from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=512, null=False)
    last_name = models.CharField(max_length=512, null=False)

    def __str__(self):
        return self.name
