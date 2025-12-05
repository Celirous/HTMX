from django.shortcuts import render
from django.contrib.auth.decorators import login_required 
from django.db.models import Q #this Q makes objects filters so that we can use the grabbed data 
from django.views.decorators.http import require_http_methods
from .forms import ContactForm

# Create your views here.
@login_required
def index(request):
    contacts = request.user.contacts.all().order_by('-created_at') # Earlier in models.py we added the var related_name and this is where the contacts  inside of User is coming from
    context = {
        'contacts': contacts,
        'form': ContactForm()
        }
    return render(request, 'contacts.html', context)

@login_required
def search_contacts(request):
    import time
    time.sleep(1)
    query = request.GET.get('search', '') # this is the name of the field inside of contacts.html "search", and if there is nothing to desplay it will default to '' blank
    # use the query to folet contacts by name OR email 
    contacts = request.user.contacts.filter(Q(name__icontains=query) | Q(email__icontains=query))
    return render(request, 'partials/contact-list.html', {'contacts':contacts})

@login_required
@require_http_methods(['POST'])
def create_contacts(request):
    form = ContactForm(request.POST)
    if form.is_valid():
        contact = form.save(commit=False)
        contact.user = request.user
        contact.save()
        # now return a patial containig a new row for out user that we can add to the table 
        context = {'contact':contact}
        return render(request, 'partials/contact-row.html', context)
