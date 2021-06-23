import { useState } from "react";

import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FastFieldProps,
  FormikBag,
} from "formik";

import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";

import { submitRegisterForm } from "../../utils/apiCalls";
import { useContextDispatch } from "../../context/Store";
import { Action } from "../../context/actions";

import ResultModal from "./ResultModal";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

const isValidEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const InnerForm = (props: FormikProps<RegisterFormValues>) => {
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
          Register
        </Button>
      </Flex>
    </Form>
  );
};

interface MyFormProps {
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
  onOpen: () => void;
  setIsFormSubmmiting: React.Dispatch<React.SetStateAction<boolean>>;
  setMsg: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  dispatch: React.Dispatch<Action>;
}

const RegisterForm = withFormik<MyFormProps, RegisterFormValues>({
  mapPropsToValues: (props: MyFormProps): RegisterFormValues => {
    return {
      email: props.initialEmail || "",
      password: props.initialPassword || "",
      name: props.initialName || "",
      repeatedPassword: "",
    };
  },

  validate: (values: RegisterFormValues) => {
    let errors: FormikErrors<RegisterFormValues> = {};
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

  handleSubmit: async (
    values,
    formikBag: FormikBag<MyFormProps, RegisterFormValues>
  ) => {
    const {
      setIsFormSubmmiting,
      setMsg,
      onOpen,
      setIsSuccess,
      dispatch,
    } = formikBag.props;
    setIsFormSubmmiting(true);
    try {
      await submitRegisterForm(values, dispatch);
      setMsg(`Account successfully created!`);
      setIsSuccess(true);
      onOpen();
    } catch (err) {
      setMsg(err.response.data.error);
      setIsSuccess(false);
      onOpen();
    }
    onOpen();
    setIsFormSubmmiting(false);
    formikBag.setSubmitting(false);
  },
})(InnerForm);

interface IRegister {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = (props: IRegister) => {
  const dispatch = useContextDispatch();

  const closeResultModal = () => {
    if (isSuccess) {
      props.setIsLoggedIn(true);
    }
    onClose();
  };

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
        <RegisterForm
          onOpen={onOpen}
          setMsg={setMsg}
          setIsFormSubmmiting={setIsFormSubmmiting}
          setIsSuccess={setIsSuccess}
          dispatch={dispatch}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          size="md"
          onClick={() => props.setIsNewUser(false)}
          disabled={isFormSubmitting}
        >
          Already an user? Log in
        </Button>
      </Flex>
      <ResultModal
        isSuccess={Boolean(isSuccess)}
        isOpen={isOpen}
        onClose={closeResultModal}
        msg={msg ? msg : ``}
      />
    </>
  );
};

export default Register;
