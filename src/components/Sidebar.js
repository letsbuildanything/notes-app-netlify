import React from 'react'

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">
                    {note.body.split('\n',1)[0].split('#', 5).find(s => s.length>=1) 
                        || `{Empty note ${index+1}}`}
                </h4>

                <button 
                    className = 'delete-btn'
                    onClick = {(event) => props.deleteNotes(event, note.id)}
                >
                    <i className = 'trash-icon gg-trash'></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
