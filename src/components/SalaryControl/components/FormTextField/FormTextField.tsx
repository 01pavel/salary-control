import { FC } from 'react';
import { FormControlProps } from 'react-bootstrap/esm/FormControl';
import { FormControl } from 'react-bootstrap';

interface FormTextFieldProps {
  input: FormControlProps;
  id: string;
}

const FormTextField: FC<FormTextFieldProps> = ({ input, id }) => {
  return <FormControl {...input} id={id} />;
};

export default FormTextField;
