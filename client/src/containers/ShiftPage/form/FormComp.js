import { Button, Form, Input, DatePicker, Select } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import branchSelectors from "../../BranchPage/selectors";
import branchActions from "../../BranchPage/actions";
import React, { useEffect } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const { Option } = Select;
const { MonthPicker } = DatePicker;
const monthFormat = "YYYY/MM";

const FormComp = ({ match, form }) => {
    const dispatch = useDispatch();
    const branchs = useSelector(branchSelectors.selectBranchs);

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
        dispatch(branchActions.list());

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
                            <span
                                style={{
                                    fontWeight: "bold"
                                }}
                            >
                                {record["id"]}
                            </span>
                        </Form.Item>
                    )}
                    <Form.Item label="Thời gian">
                        {form.getFieldDecorator("date", {
                            initialValue:isEditing() && record ? moment(record["date"]) :
                             moment(new Date()),
                            rules: [
                                {
                                    required: true,
                                    message: "Vui lòng chọn thời gian"
                                }
                            ]
                        })(
                            <DatePicker style={{width: "100%"}}
                                placeholder="Chọn thời gian"
                                allowClear={false}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Chi nhánh">
                        {form.getFieldDecorator("branch", {
                            initialValue:
                                isEditing() && record ? record["branch"]._id : null,
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

                        {/* <Link to="/shift">Quay lại</Link> */}
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
