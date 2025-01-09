from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.auth.models import User

class ContentBlock(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.FileField(upload_to="content/",
                                 validators=[FileExtensionValidator(["jpg", "jpeg", "png"])],
                                 null=True,
                                 blank=True)
    image_alt = models.CharField(max_length=30)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="content_blocks")

    def __str__(self):
        return self.title