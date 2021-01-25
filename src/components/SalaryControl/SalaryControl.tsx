import { FC, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { ISalaryForm } from '../../store/salary/types';
import MonthlySalaryInfo from './components/MonthlySalaryInfo';
import { useDebounce } from '../../hooks/useDebounce';
import FormCheck from './components/FormCheck';
import FormTextField from './components/FormTextField';

import './SalaryControl.scss';

const SalaryForm: FC<InjectedFormProps> = ({ handleSubmit }) => {
  const { salaryAmount, salaryType, withoutNdfl } = useSelector(
    (state: any) => state.form.salaryForm?.values || {}
  );

  const debouncedSalary = useDebounce(salaryAmount, 400);

  const parseField = useCallback(
    (val: string) => (val ? parseFloat(val.replaceAll(/\s/g, '')) : ''),
    [salaryAmount]
  );

  const formatField = useCallback(
    (val: number) =>
      val
        ? val.toLocaleString('ru-RU', {
            style: 'decimal',
            minimumFractionDigits: 0,
          })
        : '',
    [salaryAmount]
  );
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Label as="legend" column sm={2} className="secondary small">
            Сумма
          </Form.Label>
        </Form.Row>
        <Col sm={10}>
          <Field
            id="monthly"
            name="salaryType"
            component={FormCheck}
            type="radio"
            value="monthly"
            label="Оклад за месяц"
          />
          <Field
            id="mrot"
            name="salaryType"
            component={FormCheck}
            type="radio"
            value="mrot"
            label="МРОТ"
            info="МРОТ"
          />
          <Field
            id="daily"
            name="salaryType"
            component={FormCheck}
            type="radio"
            value="daily"
            label="Оплата за день"
          />
          <Field
            id="hourly"
            name="salaryType"
            component={FormCheck}
            type="radio"
            value="hourly"
            label="Оплата за час"
          />
          <Form.Row>
            <Form.Group controlId="withoutNdfl" className="ndfl-container">
              <Form.Label
                className={`secondary small ${!withoutNdfl ? 'active' : ''}`}
              >
                Указать с НДФЛ
              </Form.Label>
              <Field
                id="withoutNdfl"
                name="withoutNdfl"
                component={FormCheck}
                type="switch"
                value="withoutNdfl"
              />
              <Form.Label
                className={`secondary small ${withoutNdfl ? 'active' : ''}`}
              >
                Без НДФЛ
              </Form.Label>
            </Form.Group>
          </Form.Row>
          {salaryType !== 'mrot' && (
            <Form.Row>
              <Form.Group className="salary-container">
                <Field
                  id="salaryAmount"
                  name="salaryAmount"
                  component={FormTextField}
                  type="text"
                  parse={parseField}
                  format={formatField}
                />
                <div className="primary">
                  <span>&nbsp;&#8381;&nbsp;</span>
                  {salaryType === 'daily' && <span>в день</span>}
                  {salaryType === 'hourly' && <span>в час</span>}
                </div>
              </Form.Group>
            </Form.Row>
          )}
        </Col>
      </Form>
      {salaryType === 'monthly' && (
        <MonthlySalaryInfo
          salaryAmount={debouncedSalary}
          withoutNdfl={withoutNdfl}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: ISalaryForm) => ({
  initialValues: {
    salaryType: 'monthly',
    withoutNdfl: true,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'salaryForm',
    enableReinitialize: true,
  })(SalaryForm)
);
