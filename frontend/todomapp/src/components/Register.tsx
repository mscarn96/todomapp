import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import axios from "axios";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FastFieldProps,
} from "formik";

interface FormValues {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
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
          Register new user
        </Heading>

        <Field type="name" name="name">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(form.errors.name && form.touched.name)}
            >
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input {...field} id="name" placeholder="Name" />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

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
        <Field type="password" name="repeatedPassword">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(
                form.errors.repeatedPassword && form.touched.repeatedPassword
              )}
            >
              <FormLabel htmlFor="password">Repeat Password</FormLabel>
              <Input
                {...field}
                type="password"
                id="repeatedPassword"
                placeholder="Repeat password"
              />
              <FormErrorMessage>{errors.repeatedPassword}</FormErrorMessage>
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
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
}

const RegisterForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: MyFormProps): FormValues => {
    return {
      email: props.initialEmail || "",
      password: props.initialPassword || "",
      name: props.initialName || "",
      repeatedPassword: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (!values.email) {
      errors.email = "E-mail is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Invalid email address";
    } else if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be 6 characters or longer";
    } else if (values.password !== values.repeatedPassword) {
      errors.repeatedPassword = "Passwords don't match";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // TODO : think about where setIsLoggedIn()
  },
})(InnerForm);

interface IRegister {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = (props: IRegister) => {
  return (
    <Flex
      direction="column"
      flexDir="column"
      align="center"
      justify="space-around"
      w="100%"
    >
      <RegisterForm />
      <Button w="50%" onClick={() => props.setIsNewUser(false)}>
        Already an user? Log in
      </Button>
    </Flex>
  );
};

export default Register;
