import { Button, Form, Input, Select, Radio } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import branchActions from "../../BranchPage/actions";
import branchSelectors from "../../BranchPage/selectors";
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
    const branchs = useSelector(branchSelectors.selectBranchs);
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
        dispatch(branchActions.list());
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
                    <Form.Item label="Tên nhân viên">
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
                                    message: "Vui lòng nhập tên nhân viên"
                                }
                            ]
                        })(<Input type="text" placeholder="Tên nhân viên" />)}
                    </Form.Item>
                    <Form.Item label="Tên nhân viên (tiếng nga)">
                        {form.getFieldDecorator("runame", {
                            initialValue:
                                isEditing() && record ? record["runame"] : null,
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
                                    message:
                                        "Vui lòng nhập tên nhân viên (tiếng nga)"
                                }
                            ]
                        })(
                            <Input
                                type="text"
                                placeholder="Tên nhân viên (tiếng nga)"
                            />
                        )}
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
                    <Form.Item {...tailFormItemLayout}>
                        {form.getFieldDecorator("career", {
                            initialValue:
                                isEditing() && record
                                    ? record["career"]
                                    : "masseur"
                        })(
                            <Radio.Group>
                                <Radio value="masseur">Mát xa viên</Radio>
                                <Radio value="sauna">
                                    Nhân viên phòng xông
                                </Radio>
                            </Radio.Group>
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

                        {/* <Link to="/staff">Quay lại</Link> */}
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
