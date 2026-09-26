import { useEffect, useState } from "react"
import { Modal, Form, Input, InputNumber, Select, Button } from "antd"

export default function BookForm({ open, initialBook, onSubmit, onClose }) {
    const [form] = Form.useForm();
    const [preview, setPreview] = useState("");

    useEffect(function () {
        if (open === true) {
            if (initialBook !== null && initialBook !== undefined) {
                form.setFieldsValue({
                    title: initialBook.title,
                    author: initialBook.author,
                    genre: initialBook.genre,
                    year: Number(initialBook.year),
                    description: initialBook.description,
                    image: initialBook.image
                });
                setPreview(initialBook.image);
            } else {
                form.resetFields();
                form.setFieldsValue({ genre: "Fiction" });
                setPreview("");
            }
        }
    }, [open, initialBook, form]);

    function handleFinish(values) {
        const formData = {
            title: values.title.trim(),
            author: values.author.trim(),
            genre: values.genre,
            year: Number(values.year),
            description: values.description.trim(),
            image: values.image.trim()
        };
        onSubmit(formData);
    }

    function handleImageChange(event) {
        setPreview(event.target.value);
    }

    function handleCancel() {
        form.resetFields();
        setPreview("");
        onClose();
    }

    let modalTitle = "Add a new book";
    if (initialBook !== null && initialBook !== undefined) {
        modalTitle = "Edit book";
    }

    return (
        <Modal open={open} onCancel={handleCancel} footer={null} destroyOnClose={true} centered={true} width="38vw" className="ambermodal" title={null} closable={true}>
            <div className="grabber"></div>
            <h2 className="sheettitle">{modalTitle}</h2>
            <p className="sheetsub">Fill in the magic details</p>
            <p className="sheetlabel">BOOK DETAILS FROM THE SHELF</p>
            <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ genre: "Fiction" }}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
                    <Input placeholder="Book title" />
                </Form.Item>

                <Form.Item label="Author" name="author" rules={[{ required: true, message: "Author is required" }]}>
                    <Input placeholder="Author name" />
                </Form.Item>

                <Form.Item label="Genre" name="genre" rules={[{ required: true, message: "Genre is required" }]}>
                    <Select>
                        <Select.Option value="Fiction">Fiction</Select.Option>
                        <Select.Option value="Non-fiction">Non-fiction</Select.Option>
                        <Select.Option value="Fantasy">Fantasy</Select.Option>
                        <Select.Option value="Sci-Fi">Sci-Fi</Select.Option>
                        <Select.Option value="Mystery">Mystery</Select.Option>
                        <Select.Option value="History">History</Select.Option>
                        <Select.Option value="Japan">Japan</Select.Option>
                        <Select.Option value="Classic">Classic</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Publication Year" name="year" rules={[{ required: true, message: "Year is required" }]}>
                    <InputNumber placeholder="1984" min={0} max={2026} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
                    <Input.TextArea placeholder="Book description" rows={4} />
                </Form.Item>

                <Form.Item label="Image URL" name="image" rules={[
                    { required: true, message: "Image URL is required" },
                    { type: "url", message: "Image URL must start with https://" }
                ]}>
                    <Input placeholder="https://.." onChange={handleImageChange} />
                </Form.Item>

                {preview !== "" ? (
                    <div className="sheetimg">
                        <img className="preview" src={preview} alt="Book preview" />
                    </div>
                ) : null}

                <div className="formbuttons">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit">Save book</Button>
                </div>
            </Form>
        </Modal>
    );
}
