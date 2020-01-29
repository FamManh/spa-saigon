import { Button, Col, Form, Row, DatePicker, Select, Checkbox } from "antd";
import actions from "../actions";
import branchSelectors from '../../BranchPage/selectors';
import branchActions from '../../BranchPage/actions';
import React, { useEffect } from "react";
import FilterWrapper, {
    formItemLayout
} from "../../shared/styles/FilterWrapper";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
const {Option} = Select;
const dayFormat = "YYYY/MM/DD";
const ListFilter = ({ form }) => {
    const dispatch = useDispatch();
    const branchs = useSelector(branchSelectors.selectBranchs);
    const dataLoading = useSelector(selectors.selectDataLoading);

    let doSubmit = values => {
        dispatch(
            actions.list(
                { ...values, date: moment(values.date).format("x") },
                branchs
            )
        );
    };

    useEffect(() => {
        dispatch(branchActions.list());
    }, []);

    return (
        <FilterWrapper>
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
                <Row gutter={24}>
                    <Col md={24} lg={12}>
                        <Form.Item label="Thời gian">
                            {form.getFieldDecorator("date", {
                                initialValue: moment(new Date(), dayFormat),
                                rules: [
                                    {
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Chọn ngày"
                                    allowClear={false}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={12}>
                        <Form.Item label="Chi nhánh">
                            {form.getFieldDecorator("branch", {
                                initialValue: null,
                                rules: [
                                    {
                                        required: true,
                                        message: "Vui lòng chọn chi nhánh"
                                    }
                                ]
                                // branchs && branchs[0] ? branchs[0].id : null
                            })(
                                <Select
                                    placeholder="Chọn chi nhánh"
                                    allowClear={true}
                                >
                                    {branchs.map((branch, key) => (
                                        <Option
                                            key={branch.id}
                                            value={branch.id}
                                        >
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col className="filter-buttons" span={24}>
                        <Button
                            loading={dataLoading}
                            icon="search"
                            type="primary"
                            htmlType="submit"
                        >
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FilterWrapper>
    );
};

export default Form.create()(ListFilter);
