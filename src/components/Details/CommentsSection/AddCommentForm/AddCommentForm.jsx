import React from 'react'

export default function AddCommentForm({
    formSubmit, formValues, onChange
}) {
    return (
        <form onSubmit={formSubmit} className='add-comment-form'>
            <label htmlFor='content'><i className="fas fa-comment"></i>
                <input
                    type="text"
                    placeholder='add a comment'
                    name='content'
                    id='content'
                    value={formValues.content}
                    onChange={onChange}
                />
            </label>
            
            <button>Add</button>
        </form>
    )
}
