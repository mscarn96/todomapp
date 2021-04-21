import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
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
  FormikBag,
} from "formik";
import { useState } from "react";
import ResultModal from "./ResultModal";

interface FormValues {
  email: string;
  password: string;
}

const isValidEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const submitLoginForm = async (values: FormValues) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
    values
  );
  return response;
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
          isLoading={isSubmitting}
          loadingText="Logging..."
          colorScheme="teal"
          size="md"
          isFullWidth
          type="submit"
          disabled={isSubmitting}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
  onOpen: () => void;
  setIsFormSubmmiting: React.Dispatch<React.SetStateAction<boolean>>;
  setMsg: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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

  handleSubmit: async (
    values,
    formikBag: FormikBag<MyFormProps, FormValues>
  ) => {
    const {
      setIsFormSubmmiting,
      setMsg,
      onOpen,
      setIsSuccess,
    } = formikBag.props;
    setIsFormSubmmiting(true);
    try {
      await submitLoginForm(values);
      setMsg(`You're now logged in!`);
      setIsSuccess(true);
      onOpen();
    } catch (err) {
      setMsg(err.response.data.error);
      setIsSuccess(false);
      onOpen();
    }
    setIsFormSubmmiting(false);
    formikBag.setSubmitting(false);
  },
})(InnerForm);

interface ILogin {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: ILogin) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [msg, setMsg] = useState<string>();

  const [isSuccess, setIsSuccess] = useState<boolean>();

  //additional state to block signup button while login try
  const [isFormSubmitting, setIsFormSubmmiting] = useState(false);

  return (
    <>
      <Flex
        direction="column"
        flexDir="column"
        align="center"
        justify="space-around"
        w="100%"
      >
        <LoginForm
          onOpen={onOpen}
          setIsFormSubmmiting={setIsFormSubmmiting}
          setMsg={setMsg}
          setIsSuccess={setIsSuccess}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          size="md"
          onClick={() => props.setIsNewUser(true)}
          disabled={isFormSubmitting}
        >
          New User? Sign up
        </Button>
      </Flex>
      <ResultModal
        isOpen={isOpen}
        isSuccess={Boolean(isSuccess)}
        onClose={onClose}
        msg={msg ? msg : ``}
      />
    </>
  );
};

export default Login;
