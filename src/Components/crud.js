import React, { useState} from "react"
import {Button, Modal, Table, Form, Input, Popconfirm, InputNumber } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import 'antd/dist/reset.css';

const initialValues = {
    title: '',
    subTitle: '',
    author: ''
}
const Blog = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = React.useState([])
    const [editingId, setEditingId] = useState(null);

    const [editData, setEditData] = useState({})

    const handleDelete = (record) => {
        const newData = dataSource.filter((item) => item?.id !== record.id);
        setDataSource(newData);
    };

    const columns = [
        {
            title: 'Blog ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: 'SubTitle',
            dataIndex: 'subTitle',
            key: 'subtitle',
            align: 'center'
        },
        {
            title: 'author',
            dataIndex: 'author',
            key: 'author',
            align: 'center'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className={"flex items-center justify-center"}>
                        {editData?.id === record?.id ? (
                            <>
                                <Button className={"mr-[5px]"} onClick={()=> handleSave(record)}>Save</Button>
                                <Button onClick={handleEditCancel}>Cancel</Button>
                            </>
                        ) : (
                            <div>
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                                    <Button danger className={"mr-2"}>Delete</Button>
                                </Popconfirm>
                                <Button className={"border-blue"} onClick={() => handleEdit(record)}>Edit</Button>
                            </div>
                        )}
                    </div>
                ) : null,
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [blogID, setBlogID] = useState(0)

    const handleOk = () => {form.validateFields().then((values) => {
        // Perform form submission or validation logic here
        console.log('form Val==>',values)
        setIsModalVisible(false);

        }).catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormSubmit = (data) => {
        console.log('Handle Submission==>',data )
        const modifyData = data
        modifyData['id'] = blogID + 1
        setBlogID(blogID +1)
        setDataSource([...dataSource, modifyData])
        form.resetFields();
    }

    const handleSave = (record) => {
        setDataSource((prevData) =>
            prevData.map((item) =>
                item.id === record.id ? { ...item, ...editData } : item
            )
        );
        setEditingId(null);
        setEditData({});
    };

    const handleEdit = (record) => {
        setEditingId(record.id);
        setEditData(record)
    };
    const handleEditCancel = () => {
        console.log('test console')
        setEditingId(null);
        setEditData({});
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setEditData((prevData) => ({ ...prevData, [field]: value }));
    };

    const renderCell = (value, record, field) => {
        return editingId  === record.id ? (
            <Input
                value={editData[field]}
                onChange={(e) => handleInputChange(e, field)}
            />
        ) : (
            value
        );
    };

    const dataSourceModification = dataSource.map((record) => ({

        ...record,
        title: renderCell(record.title, record, 'title'),
        subTitle: renderCell(record.subTitle, record, 'subTitle'),
        author: renderCell(record.author, record, 'author'),

    }));

    return(
        <div>
            {isModalVisible  &&
            <Modal title="ADD DATA" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   okButtonProps={{ style: { backgroundColor: 'rgb(128 131 126)', borderColor: 'rgb(128 131 126)' } }}
                   cancelButtonProps={{ style: { backgroundColor: 'rgb(128 131 126)', borderColor: 'rgb(128 131 126)', color:'white' } }} >

                <Form form={form} name="control-hooks" initialValues={initialValues} onFinish={handleFormSubmit}>
                    <div className="grid p-3">
                        <Form.Item
                            name="title"
                            label={
                                <span style={{ fontWeight: 'bold' }}>Title:</span>
                            }
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                { required: true, message: 'Please enter title of Blog' },
                            ]}
                        >

                            <Input className="w-full p-2" name={"title"} placeholder={"Title"}/>
                        </Form.Item>

                        <Form.Item
                            name="subTitle"
                            label={
                                <span style={{ fontWeight: 'bold' }}>Sub Title:</span>
                            }
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                { required: true, message: 'Please enter Sub Title of the Blog' },
                            ]}
                        >
                            <Input className="w-full p-2" />
                        </Form.Item>

                        <Form.Item
                            name="author"
                            label={
                                <span style={{ fontWeight: 'bold' }}>Author:</span>
                            }
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                { required: true, message: 'Please enter Author name' },
                            ]}
                        >
                            <Input className="w-full p-2" placeholder={"Author"} />
                        </Form.Item>

                        <Form.Item >
                            <Button className={""} htmlType="submit">
                                Submit
                            </Button>

                        </Form.Item>
                    </div>

                </Form>

            </Modal>
            }
            <div className={'flex justify-start m-3'}>
                <Button type="text" shape="round"  className={"inline-flex items-center gap-1"} icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}>
                    Add Item
                </Button>
            </div>

            <Table
                dataSource={dataSourceModification}
                columns={columns}
                bordered />;

        </div>
    )
}

export default Blog;