import { Button, Form, Input } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../../configureStore";
import { Link } from "react-router-dom";
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
    }, []);

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
                    <Form.Item label="Tên chi nhánh">
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
                                    message: "Vui lòng nhập tên chi nhánh"
                                }
                            ]
                        })(<Input type="text" placeholder="Tên chi nhánh" />)}
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

                        {/* <Link to="/branch">Quay lại</Link> */}
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
