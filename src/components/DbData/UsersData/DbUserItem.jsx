export default function DbUserItem({
    user
}) {

    return (
        <p> {user.objectId == 'WUPIIfvKlP' ? <strong>ADMIN: </strong> : <strong>USER: </strong>}
            {user.username}                
        </p>
    )
}
