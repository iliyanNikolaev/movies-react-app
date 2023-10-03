import React from 'react'
import styles from './AddComment.module.css'
export default function AddCommentForm({
    formSubmit, formValues, onChange
}) {
    return (
        <form onSubmit={formSubmit} className='add-comment-form'>
            <label htmlFor='content'><i className={`fas fa-comment ${styles.icon}`}></i>
                <input
                    type="text"
                    placeholder='add a comment'
                    name='content'
                    id='content'
                    value={formValues.content}
                    onChange={onChange}
                    className={styles.input}
                />
            </label>
            
            <button>Add</button>
        </form>
    )
}
