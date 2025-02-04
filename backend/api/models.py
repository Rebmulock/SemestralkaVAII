from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.auth.models import User

class ContentBlock(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.FileField(upload_to="content/", null=True, blank=True, validators=[
        FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])
    ])
    image_alt = models.CharField(max_length=30)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="content_blocks")

    def __str__(self):
        return self.title


class UserFeedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name