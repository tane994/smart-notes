from django.forms import ModelForm
from quicknotes.models import Note

class NoteForm(ModelForm):
    class Meta:
        # Use the 'Note' model as a template (blueprint) to automatically shape this form,
        # extracting and setting up only the 'title' and 'content' fields.
        model = Note
        fields = ['title', 'content']