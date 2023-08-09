import ErrorMsg from "../../../ErrorMsg/ErrorMsg"

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
                        type="text"
                        name="content"
                        value={currComment.content}
                        onChange={onChange} />
                    <input
                        type="submit"
                        value="Save Changes"
                        onClick={onEditHandler} />
                </>
            }
        </>
    )
}
