import { Modal, Button } from "antd"

export default function BookDetail({ open, book, onClose }) {
    function handleImageError(event) {
        event.target.src = "https://via.placeholder.com/300x400?text=No+Image";
    }

    if (book === null || book === undefined) {
        return null;
    }

    return (
        <Modal open={open} onCancel={onClose} footer={null} destroyOnClose={true} centered={true} width="50vw" className="ambermodal" title={null} closable={true}>
            <div className="grabber"></div>
            <div className="sheetimg">
                <img className="detailimg" src={book.image} alt={book.title} onError={handleImageError} />
            </div>
            <h2 className="sheettitle">{book.title}</h2>
            <p className="sheetsub">{book.author}</p>
            <p className="sheetlabel">{book.genre} · {book.year}</p>
            <p className="sheetdesc">{book.description}</p>
            <p className="pill">{book.genre} - {book.year}</p>
            <div className="formbuttons">
                <Button onClick={onClose}>Close</Button>
            </div>
        </Modal>
    );
}
