from django.shortcuts import redirect, render, get_object_or_404
from quicknotes_api.models.note import Note
from quicknotes_site.forms import NoteForm

def home(request):
    return render(request, 'home.html')

def notes(request):
    """Lista di tutte le note con il form per crearne una nuova."""
    data = Note.objects.all()
    form = NoteForm()
    return render(request, 'quicknotes/index.html', {'notes': data, 'form': form})

def note(request, note_id):
    """Dettaglio di una singola nota."""
    note_obj = get_object_or_404(Note, pk=note_id)
    form = NoteForm(instance=note_obj)
    return render(request, 'quicknotes/note.html', {'note': note_obj, 'form': form})

def add(request):
    """Creazione di una nuova nota."""
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('notes')
    else:
        form = NoteForm()
        
    return render(request, 'quicknotes/add.html', {'form': form})

def edit(request, note_id):
    """Modifica di una nota esistente (gestisce sia GET per mostrare il form, sia POST per salvare)."""
    note_obj = get_object_or_404(Note, pk=note_id)
    
    if request.method == 'POST':
        form = NoteForm(request.POST, instance=note_obj)
        if form.is_valid():
            form.save()
            return redirect('note', note_id=note_obj.id)
    else:
        form = NoteForm(instance=note_obj)
        
    return render(request, 'quicknotes/edit.html', {'form': form, 'note': note_obj})

def delete(request, note_id):
    """Cancellazione di una nota."""
    note_obj = get_object_or_404(Note, pk=note_id)
    if request.method == 'POST':
        note_obj.delete()
        return redirect('notes')
    
    return render(request, 'quicknotes/delete_confirm.html', {'note': note_obj})