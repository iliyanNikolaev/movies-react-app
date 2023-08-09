import { createPointer } from '../utils/createPointer.js';
import { get, post, put, del } from './api.js'

const endpoints = {
    comments: '/classes/Comments',
    byId: "/classes/Comments/",
    getAllCommentsForMovie: (movieId) => `/classes/Comments/?where={"movieId": "${movieId}"}`,

}

export async function getAllComments() {
    return get(endpoints.comments);
}

export async function getCommentById(commentId) {
    return get(endpoints.byId + commentId); // {objectId: '...', content: '...', movieId: '...', username: '...', owner: {…}, …}
}

export async function getAllCommentsForMovie(movieId) {
    return get(endpoints.getAllCommentsForMovie(movieId)); // {results: Array(2)}
}

export async function createCommentForMovie(commentData, userId) {
    const finalData = {
        ...commentData,
        owner: createPointer(userId)
    }
    
    const { objectId } = await post(endpoints.comments, finalData); // {objectId: '...', createdAt: '...'}

    return getCommentById(objectId); // {objectId: '...', content: '...', movieId: '...', username: '...', owner: {…}, …}
}

export async function editCommentById(commentId, commentData) {
    
    await put(endpoints.byId + commentId, commentData); // {updatedAt: '2023-08-03T12:11:23.881Z'}
    
    return getCommentById(commentId); // {objectId: '...', content: '...', movieId: '...', username: '...', owner: {…}, …}
}

export async function deleteCommentById(commentId) {
    return del(endpoints.byId + commentId);
}

//{ "__type": "Pointer", "className": "_User", "objectId": "QaDZpdVXFE" }    <<< megi
//{ "__type": "Pointer", "className": "_User", "objectId": "WUPIIfvKlP" }    <<< ilich
 