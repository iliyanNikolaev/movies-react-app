import ErrorMsg from "../../../ErrorMsg/ErrorMsg"
import styles from './EditCommentForm.module.css';

export default function EditCommentForm({
    currComment, 
    onChange, 
    onEditHandler,
    hasError, 
    errorText
}) {
    return (
        <>
            {hasError ? <ErrorMsg text={errorText} className="edit-comment-error" />
                : <>
                    <input
                    className={styles.input}
                        type="text"
                        name="content"
                        value={currComment.content}
                        onChange={onChange} />
                    <button
                        className={styles.button}
                        type="submit"
                        onClick={onEditHandler}>Save
                    </button>
                </>
            }
        </>
    )
}
