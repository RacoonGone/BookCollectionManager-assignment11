import { Modal } from "antd"

export default function BookDelete({ open, book, onCancel, onConfirm }) {
    if (book === null || book === undefined) {
        return null;
    }

    return (
        <Modal open={open} onCancel={onCancel} onOk={onConfirm} okText="Delete" okType="danger" cancelText="Cancel" destroyOnClose={true} centered={true} width="40vw" className="ambermodal" title={null} closable={true}>
            <div className="grabber"></div>
            <h2 className="sheettitle">Delete book?</h2>
            <p className="sheetsub">{book.title}</p>
            <p className="sheetdesc">Are you sure you want to delete this book?</p>
        </Modal>
    );
}
