import { Button, Form, Input, InputNumber } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
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
            dispatch(actions.doUpdate([{ ...values, id: record.id }]));
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
                    <Form.Item label="Tên tiếng việt">
                        {form.getFieldDecorator("vnname", {
                            initialValue:
                                isEditing() && record ? record["vnname"] : null
                        })(<Input type="text" placeholder="Tên tiếng việt" />)}
                    </Form.Item>
                    <Form.Item label="Tên tiếng nga">
                        {form.getFieldDecorator("runame", {
                            initialValue:
                                isEditing() && record ? record["runame"] : null
                        })(<Input type="text" placeholder="Tên tiếng nga" />)}
                    </Form.Item>
                    <Form.Item label="Tiền mặt">
                        {form.getFieldDecorator("cash", {
                            initialValue:
                                isEditing() && record ? record["cash"] : null
                        })(
                            <InputNumber
                                type="text"
                                placeholder="Tiền mặt"
                                style={{ width: "100%" }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Certificate">
                        {form.getFieldDecorator("certificate", {
                            initialValue:
                                isEditing() && record
                                    ? record["certificate"]
                                    : null
                        })(
                            <InputNumber
                                type="text"
                                placeholder="Certificate"
                                style={{ width: "100%" }}
                            />
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

                        {/* <Link to="/ledger">Quay lại</Link> */}
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
