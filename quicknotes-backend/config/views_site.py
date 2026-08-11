from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from config.models import Note
from quicknotes_site.forms import NoteForm

def notes(request):
    data = Note.objects.all()
    return render(request, 'quicknotes/index.html', {'notes': data, 'form': NoteForm})

def note(request, note_id):
    data = get_object_or_404(Note, pk=note_id)
    note_form = NoteForm(instance=data)
    if data:
        return render(request, 'quicknotes/note.html', {'note': data, 'form': note_form})
    
    raise Http404('Note not found.')

def add(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('notes')
    
    
def edit(request, note_id):
    if request.method == 'POST':
        note = get_object_or_404(Note, pk=note_id)
        form = NoteForm(request.POST, instance=note)
        if form.is_valid():
            form.save()
        return redirect('note', note_id=note.id)

def delete(request, note_id):
    if request.method == 'POST':
        note = get_object_or_404(Note, pk=note_id)
        note.delete()
        return redirect('notes')
    