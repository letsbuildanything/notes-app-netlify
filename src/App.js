import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import React from 'react'

export default function App() {
    const [notes, setNotes] = React.useState(() => (
		JSON.parse(localStorage.getItem('notes')) || []
	))

    const [currentNoteId, setCurrentNoteId] = React.useState(() => (
        (notes[0] && notes[0].id) || ""
	))
    
	React.useEffect( () => 
		localStorage.setItem('notes', JSON.stringify(notes))
	, [notes])

	// function creating new note ------------------------------------
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
	//---------------------------------------------------------------
    function updateNote(text) {

		setNotes(oldNotes => {
			const fooArr = []
			const len = oldNotes.length;
			for(let i=0; i<len; i++){
				if(oldNotes[i].id === currentNoteId)
					fooArr.unshift({id: currentNoteId, body: text})
				else
					fooArr.push(oldNotes[i])				
			}
			return fooArr;
		})
    }
    
	//-----------------------------------------------------------------
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

	// deleteNotes function -----------------------------------------------
	function deleteNotes(event, noteId){
		event.stopPropagation();
		// delete the required notes..
		setNotes(oldNotes => (
			oldNotes.filter(note => note.id !== noteId)
		))
	}
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
					deleteNotes={deleteNotes}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
