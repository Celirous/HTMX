from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='contacts' # Django grabs the actual contacts using user.contacts.all()
    )
    
    class Meta:
        unique_together = ('user', 'email') #this makes it so that we constrain the email field, because we dont want one user to have contacts with the same email. The reason we use 'unique_together is because we want other users to have similar emails as they dont share lists. 

    def __str__(self):
        return f'{self.name} <{self.email}>'


