import { FC, memo, useMemo } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { NDFL_PERCENT } from '../../../../constants';
import { toRubleFormat } from '../../../../utils/toRubleFormat';
import './MonthlySalaryInfo.scss';

interface MonthlySalaryInfoProps {
  salaryAmount: number;
  withoutNdfl: boolean;
}

const MonthlySalaryInfo: FC<MonthlySalaryInfoProps> = ({
  salaryAmount,
  withoutNdfl,
}) => {
  const { ndflAmount, wholeEmployeeCost, salaryInRubles } = useMemo(() => {
    if (!salaryAmount) {
      return {};
    }

    let ndflAmount, wholeEmployeeCost, rubleSalaryAmount;

    if (withoutNdfl) {
      wholeEmployeeCost = salaryAmount / ((100 - NDFL_PERCENT) / 100);
      ndflAmount = (NDFL_PERCENT / 100) * wholeEmployeeCost;
      rubleSalaryAmount = salaryAmount;
    } else {
      ndflAmount = (NDFL_PERCENT / 100) * salaryAmount;
      wholeEmployeeCost = salaryAmount;
      rubleSalaryAmount = wholeEmployeeCost - ndflAmount;
    }

    return {
      ndflAmount: toRubleFormat(Math.round(ndflAmount)),
      wholeEmployeeCost: toRubleFormat(Math.round(wholeEmployeeCost)),
      salaryInRubles: toRubleFormat(rubleSalaryAmount),
    };
  }, [salaryAmount, withoutNdfl]);

  if (!salaryAmount) return null;

  return (
    <Jumbotron fluid className="salary-description">
      <Container>
        <p className="salary-description__paragraph">
          <strong>{salaryInRubles} </strong>
          сотрудник будет получать на руки
        </p>
        <p className="salary-description__paragraph">
          <strong>{ndflAmount} </strong>
          НДФЛ, {NDFL_PERCENT}% от оклада
        </p>
        <p className="salary-description__paragraph">
          <strong>{wholeEmployeeCost} </strong>
          за сотрудника в месяц
        </p>
      </Container>
    </Jumbotron>
  );
};

export default memo(MonthlySalaryInfo);
