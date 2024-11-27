from django.db import models

class User(models.Model):
    username = models.CharField(
        max_length=20,
        unique=True,
        help_text="This field is required.",
        error_messages={
            "unique": "This username already exists.",
        })

    password = models.CharField(
        max_length=255,
        help_text="This field is required.",
    )
