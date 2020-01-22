import { Button, Col, Form, Row, DatePicker, Select } from "antd";
import actions from "../actions";
import branchSelectors from '../../BranchPage/selectors';
import branchActions from '../../BranchPage/actions';
import React, { useEffect } from "react";
import FilterWrapper, {
    formItemLayout
} from "../../shared/styles/FilterWrapper";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
const {Option} = Select;
const { MonthPicker } = DatePicker;
const monthFormat = "YYYY/MM";
const ListFilter = ({ form }) => {
    const dispatch = useDispatch();
    const branchs = useSelector(branchSelectors.selectBranchs);

    let doSubmit = values => {
        dispatch(actions.list({...values, date: moment(values.date).format('x')}));
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
                                initialValue: moment(new Date(), monthFormat),
                                rules: [
                                    {
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(<MonthPicker placeholder="Chọn tháng" allowClear={false}/>)}
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={12}>
                        <Form.Item label="Chi nhánh">
                            {form.getFieldDecorator("branch", {
                                // initialValue: branchs && branchs[0] ? branchs[0].id : null
                            })(
                                <Select placeholder="Chọn chi nhánh" allowClear={true}>
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
                            // loading={loading}
                            icon="search"
                            type="primary"
                            htmlType="submit"
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            // loading={loading}
                            htmlType="reset"
                            icon="undo"
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FilterWrapper>
    );
};

export default Form.create()(ListFilter);
