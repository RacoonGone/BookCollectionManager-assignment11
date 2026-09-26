import './App.css'
import { useState, useEffect } from "react"
import { Button } from "antd"
import Book from "./components/Book"
import BookForm from "./components/BookForm"
import BookDetail from "./components/BookDetail"
import BookDelete from "./components/BookDelete"
import { getBooks, createBook, updateBook, deleteBook } from "./api/bookapi"

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [detailBook, setDetailBook] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    function fetchBooks() {
        setLoading(true);
        setError("");
        getBooks()
            .then(function (data) {
                setBooks(data);
                setLoading(false);
            })
            .catch(function (err) {
                console.error(err);
                setError("Failed to load books. Please try again.");
                setLoading(false);
            });
    }

    useEffect(function () {
        fetchBooks();
    }, []);

    function handleAddClick() {
        setEditingBook(null);
        setShowForm(true);
    }

    function handleEditClick(book) {
        setEditingBook(book);
        setShowForm(true);
    }

    function handleViewClick(book) {
        setDetailBook(book);
    }

    function handleDeleteClick(book) {
        setDeleteTarget(book);
    }

    function handleCloseForm() {
        setShowForm(false);
        setEditingBook(null);
    }

    function handleFormSubmit(formData) {
        const dataToSave = {
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            year: Number(formData.year),
            description: formData.description,
            image: formData.image
        };

        if (editingBook === null) {
            createBook(dataToSave)
                .then(function (newBook) {
                    const updatedBooks = [...books, newBook];
                    setBooks(updatedBooks);
                    handleCloseForm();
                })
                .catch(function (error) {
                    console.error(error);
                    alert("Failed");
                });
        } else {
            updateBook(editingBook.id, dataToSave)
                .then(function (updatedBook) {
                    const updatedBooks = books.map(function (book) {
                        if (book.id === updatedBook.id) {
                            return updatedBook;
                        } else {
                            return book;
                        }
                    });
                    setBooks(updatedBooks);
                    handleCloseForm();
                })
                .catch(function (error) {
                    console.error(error);
                    alert("Failed");
                });
        }
    }

    function handleConfirmDelete() {
        deleteBook(deleteTarget.id)
            .then(function () {
                const remainingBooks = books.filter(function (book) {
                    return book.id !== deleteTarget.id;
                });
                setBooks(remainingBooks);
                setDeleteTarget(null);
            })
            .catch(function (error) {
                console.error(error);
                alert("Failed");
            });
    }

    function handleCancelDelete() {
        setDeleteTarget(null);
    }

    function handleCloseDetail() {
        setDetailBook(null);
    }

    return (
        <div className="page">
            <header className="header">
                <div className="headertext">
                    <p className="eyebrow">コハク妖菓子店</p>
                    <h1 className="sitetitle">Book Collection Manager</h1>
                    <p className="subtitle">Every book you have read, borrowed, or want to bring about</p>
                    <p className="count">
                        {loading ? "Loading books..." : books.length + " books on the shelf"}
                    </p>
                </div>
                <Button type="primary" className="btnadd" onClick={handleAddClick}>+ Add a book</Button>
            </header>

            <hr className="divider" />

            {loading ? (<p className="message">Loading books...</p> ) : null}

            {error !== "" && loading === false ? (
                <div className="message">
                    <p>{error}</p>
                    <Button className="btnview" onClick={fetchBooks}>Try again</Button>
                </div>
            ) : null}

            {loading === false && error === "" && books.length === 0 ? (
                <p className="message">No books yet. Click "+ Add a book" to add your first book.</p>
            ) : null}

            <main className="grid">
                {books.map(function (book) {
                    return (
                        <Book
                            key={book.id}
                            book={book}
                            onView={handleViewClick}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    );
                })}
            </main>

            <BookForm open={showForm} initialBook={editingBook} onSubmit={handleFormSubmit} onClose={handleCloseForm} />

            {detailBook !== null ? (
                <BookDetail open={true} book={detailBook} onClose={handleCloseDetail} />
            ) : null}

            {deleteTarget !== null ? (
                <BookDelete open={true} book={deleteTarget} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
            ) : null}
        </div>
    );
}

export default App
