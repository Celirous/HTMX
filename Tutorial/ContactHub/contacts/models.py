from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField
from django.core.validators import FileExtensionValidator

class User(AbstractUser):
    pass


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    document = models.FileField(
        upload_to='contact_docs/',
        validators=[FileExtensionValidator(['pdf','doc','docx','txt'])],
        blank=True,
        null=True,
    )
         # Separate field for images (will show previews)
    image = CloudinaryField(
        'image',
        resource_type='image',  # This will show previews
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif', 'webp'])],
        blank=True,
        null=True
    )
    
    # Edited field to use Cloudinary
    document = CloudinaryField(
        'document',
        resource_type='raw',  # Use 'raw' for documents like pdf, docx, txt, images
        validators=[FileExtensionValidator(['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'])],
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name="contacts") #user.contacts.all() This will show us the contacts for the user that is currently signed in 
    
    class Meta:
        unique_together = ('user', 'email', 'image', 'document') #this makes it so that you cannot save more than 1 of the same emails in a single user as they are unique anyway. But we specify unique here because differnt users can still have the same email in their contact list
    
    def __str__(self):
        return f"{self.name} <{self.email}>"
    
