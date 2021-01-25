import { FC, useState, useRef, useCallback, memo } from 'react';
import { Form, FormCheckProps, Overlay, Tooltip } from 'react-bootstrap';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';

import './FormCheck.scss';

interface FormCheckItemProps {
  id: string;
  input: FormCheckProps;
  label: string;
  info: string | void;
  type: FormCheckType;
}

const FormCheck: FC<FormCheckItemProps> = ({
  input,
  id,
  label,
  info,
  type,
}) => {
  const tooltipTarget = useRef(null);
  const [state, setState] = useState({
    showTooltip: false,
    isTooltipPinned: false,
  });
  const toggleShowAndPinned = useCallback(() => {
    setState((prevState) => ({
      showTooltip: !prevState.isTooltipPinned,
      isTooltipPinned: !prevState.isTooltipPinned,
    }));
  }, [state]);

  if (type === 'switch') {
    input.checked = Boolean(input.value);
  }

  return (
    <div className="salary-type">
      <Form.Check
        value={input.value}
        {...input}
        id={id}
        label={label}
        type={type}
        className={type === 'switch' ? 'ndfl-switch' : 'ndfl-radio'}
      />
      {info && (
        <>
          <div
            className="info info--right"
            ref={tooltipTarget}
            onClick={toggleShowAndPinned}
            onMouseEnter={() => setState({ ...state, showTooltip: true })}
            onMouseLeave={() =>
              !state.isTooltipPinned &&
              setState({ ...state, showTooltip: false })
            }
          >
            <span className="secondary">
              {state.isTooltipPinned ? '\u2715' : 'i'}
            </span>
          </div>
          <Overlay
            target={tooltipTarget.current}
            show={state.isTooltipPinned || state.showTooltip}
            placement="bottom"
          >
            {(props) => (
              <Tooltip id="mrot-tooltip" className="mrot-tooltip" {...props}>
                МРОТ - минимальный размер оплаты труда. Разный для разных
                регионов.
              </Tooltip>
            )}
          </Overlay>
        </>
      )}
    </div>
  );
};

export default memo(FormCheck);
