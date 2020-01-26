import { Button, Form, Input, Select } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
const {Option} = Select;
const FormComp = ({ match, form }) => {
    const dispatch = useDispatch();
    const saveLoading = useSelector(selectors.selectSaveLoading);
    const dataLoading = useSelector(selectors.selectDataLoading);
    const record = useSelector(selectors.selectRecord);
    let isEditing = () => {
        return !!match.params.id;
    };

    let doSubmit = values => {
        if (isEditing()) {
            dispatch(actions.doUpdate(record.id, values));
        } else {
            dispatch(actions.doCreate(values));
        }
    };

    useEffect(() => {
        if (isEditing()) {
            dispatch(actions.doFind(match.params.id));
        }
    },[]);

    let renderForm = () => {
        return (
            <FormWrapper>
                <Form
                    {...formItemLayout}
                    onSubmit={e => {
                        e.preventDefault();
                        form.validateFields((err, values) => {
                            if (!err) {
                                doSubmit(values);
                            }
                        });
                    }}
                >
                    {isEditing() && record && (
                        <Form.Item label="ID">
                            <span style={{ fontWeight: "bold" }}>
                                {record["id"]}
                            </span>
                        </Form.Item>
                    )}
                    <Form.Item label="Tên">
                        {form.getFieldDecorator("username", {
                            initialValue:
                                isEditing() && record
                                    ? record["username"]
                                    : null,
                            rules: [
                                {
                                    min: 3,
                                    message: "Ít nhất 3 kí tự"
                                },
                                {
                                    max: 128,
                                    message: "Nhiều nhất 128 kí tự"
                                },
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập"
                                }
                            ]
                        })(<Input type="text" placeholder="Tên đăng nhập" />)}
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        {form.getFieldDecorator("password", {
                            initialValue:
                                isEditing() && record
                                    ? record["password"]
                                    : null,
                            rules: [
                                {
                                    max: 128,
                                    message: "Nhiều nhất 128 kí tự"
                                }
                            ]
                        })(<Input type="text" placeholder="Mật khẩu" />)}
                    </Form.Item>
                    <Form.Item label="Vai trò">
                        {form.getFieldDecorator("role", {
                            initialValue:
                                isEditing() && record
                                    ? record["role"]
                                    : null,
                            rules: [
                                {
                                    required: true,
                                    message: "Vui lòng chọn vai trò"
                                }
                            ]
                        })(
                            <Select placeholder="Chọn vai trò">
                                <Option value="user">User</Option>
                                <Option value="admin">Admin</Option>
                                <Option value="superadmin">Super admin</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item className="form-buttons" {...tailFormItemLayout}>
                        <Button
                            loading={saveLoading}
                            type="primary"
                            htmlType="submit"
                            icon="save"
                        >
                            Lưu
                        </Button>

                        <Button
                            disabled={saveLoading}
                            onClick={() => form.resetFields()}
                            icon="undo"
                        >
                            Reset
                        </Button>

                        {/* <Link to="/user">Quay lại</Link> */}
                    </Form.Item>
                </Form>
            </FormWrapper>
        );
    };

    if (dataLoading) {
        return <Spinner />;
    }

    if (isEditing() && !record) {
        return <Spinner />;
    }
    return renderForm();
};

export default Form.create()(FormComp);
