import { Button, Form, Input, Select, Divider } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect, useState } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import DynamicFormItem from "./DynamicFormItem";
import branchSelectors from "../../BranchPage/selectors";
const { Option } = Select;

const FormComp = ({ match, form }) => {
    let isEditing = () => {
        return !!match.params.id;
    };
    const dispatch = useDispatch();
    const saveLoading = useSelector(selectors.selectSaveLoading);
    const dataLoading = useSelector(selectors.selectDataLoading);
    const record = useSelector(selectors.selectRecord);
    const branchs = useSelector(branchSelectors.selectBranchs);
    const [serviceItems, setServiceItems] = useState([]);

    let doSubmit = values => {
        values.items = serviceItems;
        if (isEditing()) {
            dispatch(actions.doUpdate(record.id, values));
        } else {
            dispatch(actions.doCreate(values));
        }
    };

    const onServiceItemsChange = values => {
        setServiceItems(values);
    };

    

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
                            <span
                                style={{
                                    fontWeight: "bold"
                                }}
                            >
                                {record["id"]}
                            </span>
                        </Form.Item>
                    )}
                    <Form.Item label="Code dịch vụ">
                        {form.getFieldDecorator("code", {
                            initialValue:
                                isEditing() && record ? record["code"] : null,
                            rules: [
                                {
                                    min: 1,
                                    message: "Ít nhất 3 kí tự"
                                },
                                {
                                    max: 128,
                                    message: "Nhiều nhất 128 kí tự"
                                },
                                {
                                    required: true,
                                    message: "Vui lòng nhập code dịch vụ"
                                }
                            ]
                        })(<Input type="text" placeholder="Tên dịch vụ" />)}
                    </Form.Item>
                    <Form.Item label="Tên dịch vụ">
                        {form.getFieldDecorator("name", {
                            initialValue:
                                isEditing() && record ? record["name"] : null,
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
                                    message: "Vui lòng nhập tên dịch vụ"
                                }
                            ]
                        })(<Input type="text" placeholder="Tên dịch vụ" />)}
                    </Form.Item>
                    <Form.Item label="Chi nhánh" hasFeedback>
                        {form.getFieldDecorator("branch", {
                            initialValue:
                                isEditing() && record
                                    ? record["branch"]._id
                                    : null,
                            rules: [
                                {
                                    required: true,
                                    message: "Vui lòng chọn chi nhánh"
                                }
                            ]
                        })(
                            <Select placeholder="Chọn chi nhánh">
                                {branchs.map((branch, key) => (
                                    <Option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Divider>Dịch vụ</Divider>

                    <DynamicFormItem
                        match={match}
                        onChange={onServiceItemsChange}
                        initialValue={isEditing() ? record.items : null}
                    />

                    <Divider />

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

                        {/* <Link to="/service">Quay lại</Link> */}
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
