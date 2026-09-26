export default function Book({ book, onView, onEdit, onDelete }) {
    function handleImageError(event) {
        event.target.src = "https://via.placeholder.com/300x400?text=No+Image";
    }

    return (
        <div className="book">
            <div className="cover">
                <span className="badge">{book.genre}</span>
                <img src={book.image} alt={book.title} onError={handleImageError} />
            </div>
            <div className="details">
                <h3 className="booktitle">{book.title}</h3>
                <p className="bookauthor">{book.author}</p>
                <p className="bookmeta">{book.genre} - {book.year}</p>
                <div className="actions">
                    <button className="btnview" onClick={function () { onView(book); }}>View</button>
                    <button className="btnedit" onClick={function () { onEdit(book); }}>Edit</button>
                    <button className="btndelete" onClick={function () { onDelete(book); }}>Delete</button>
                </div>
            </div>
        </div>
    );
}
