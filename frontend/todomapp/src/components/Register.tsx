import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const isValidEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: MyFormProps): FormValues => {
    return {
      name: props.initialName || "",
      email: props.initialEmail || "",
      password: props.initialPassword || "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

const Register = () => {
  return (
    <div>
      <MyForm />
    </div>
  );
};

export default Register;
