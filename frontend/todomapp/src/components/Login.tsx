import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FastFieldProps,
} from "formik";

interface FormValues {
  email: string;
  password: string;
}

const isValidEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const InnerForm = (props: FormikProps<FormValues>) => {
  const { errors, isSubmitting } = props;
  return (
    <Form>
      <Flex
        flexDir="column"
        align="center"
        justify="space-around"
        h="80vh"
        w="100%"
        p="8"
        mt="8"
        mb="8"
      >
        <Heading as="h1" color="teal.800">
          TodoMapp
        </Heading>
        <Heading as="h2" fontSize="lg" color="teal.500">
          Log In
        </Heading>
        <Field type="email" name="email">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(form.errors.email && form.touched.email)}
            >
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input {...field} id="email" placeholder="E-mail" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field type="password" name="password">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(form.errors.password && form.touched.password)}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...field}
                type="password"
                id="password"
                placeholder="Password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          disabled={isSubmitting}
          d="block"
        >
          Log In
        </Button>
      </Flex>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}

const LoginForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: MyFormProps): FormValues => {
    return {
      email: props.initialEmail || "",
      password: props.initialPassword || "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "E-mail is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Invalid email address";
    } else if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  },

  handleSubmit: (values) => {},
})(InnerForm);

interface ILogin {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: ILogin) => {
  return (
    <Flex
      direction="column"
      flexDir="column"
      align="center"
      justify="space-around"
      w="100%"
    >
      <LoginForm />
      <Button w="50%" onClick={() => props.setIsNewUser(true)}>
        New User? Sign up
      </Button>
    </Flex>
  );
};

export default Login;
