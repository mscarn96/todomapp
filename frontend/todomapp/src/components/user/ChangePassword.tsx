import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { createStandaloneToast } from "@chakra-ui/toast";
import {
  FastFieldProps,
  Field,
  Form,
  FormikBag,
  FormikErrors,
  FormikProps,
  withFormik,
} from "formik";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Action } from "../../context/actions";
import { useContextDispatch } from "../../context/Store";
import { submitchangePassword } from "../../utils/apiCalls";

interface IChangePassword {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangePassFormValues {
  currentPassword: string;
  newPassword: string;
  repeatedPassword: string;
}

const InnerForm = (
  props: FormikProps<ChangePassFormValues> & { closeModal: () => void }
) => {
  const { errors, closeModal, values } = props;

  return (
    <Form>
      <Box p="4">
        <Field type="password" name="currentPassword">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(
                form.errors.currentPassword && form.touched.currentPassword
              )}
            >
              <FormLabel>Current password</FormLabel>
              <Input
                {...field}
                placeholder="Current password"
                id="currentPassword"
                type="password"
              />
              <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field type="password" name="newPassword">
          {({ field, form }: FastFieldProps<any>) => (
            <FormControl
              isInvalid={Boolean(
                form.errors.newPassword && form.touched.newPassword
              )}
            >
              <FormLabel>New password</FormLabel>
              <Input
                {...field}
                placeholder="New password"
                id="newPassword"
                type="password"
              />
              <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
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
              <FormLabel>Repeated password</FormLabel>
              <Input
                {...field}
                placeholder="Repeated password"
                id="repeatedPassword"
                type="password"
              />
              <FormErrorMessage>{errors.repeatedPassword}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            disabled={Boolean(
              values.currentPassword === "" ||
                errors.currentPassword ||
                errors.newPassword ||
                errors.repeatedPassword
            )}
            type="submit"
          >
            Save
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Box>
    </Form>
  );
};

interface MyFormProps {
  initialCurrentPassword?: string;
  initialNewPassword?: string;
  initialRepeatedPassword?: string;
  dispatch: React.Dispatch<Action>;
  token: string;
  closeModal: () => void;
}

const ChangePasswordForm = withFormik<MyFormProps, ChangePassFormValues>({
  mapPropsToValues: (props: MyFormProps): ChangePassFormValues => {
    return {
      currentPassword: props.initialCurrentPassword || "",
      newPassword: props.initialNewPassword || "",
      repeatedPassword: props.initialRepeatedPassword || "",
    };
  },

  validate: (values: ChangePassFormValues) => {
    let errors: FormikErrors<ChangePassFormValues> = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Enter current password";
    } else if (values.currentPassword.length < 6) {
      errors.currentPassword = "Password must be 6 characters or longer";
    } else if (!values.newPassword) {
      errors.newPassword = "Enter new password";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must be 6 characters or longer";
    } else if (!values.repeatedPassword) {
      errors.repeatedPassword = "Repeat new password";
    } else if (values.newPassword !== values.repeatedPassword) {
      errors.repeatedPassword = "Passwords don't match";
    }
    return errors;
  },

  handleSubmit: async (
    values,
    formikBag: FormikBag<MyFormProps, ChangePassFormValues>
  ) => {
    const { token, closeModal } = formikBag.props;
    const toast = createStandaloneToast();
    try {
      await submitchangePassword(
        values.currentPassword,
        values.newPassword,
        token
      );
      toast({
        title: "Password changed.",
        description: "You've succesfully changed your password.",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err.response.data.error}`,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
    formikBag.setSubmitting(false);
    closeModal();
  },
})(InnerForm);

const ChangePassword = (props: IChangePassword) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const closeModal = () => {
    props.setVisible(false);
    onClose();
  };

  useEffect(() => {
    if (props.isVisible && !isOpen) {
      onOpen();
    }
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ChangePasswordForm
            dispatch={dispatch}
            token={cookies.jwt}
            closeModal={closeModal}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
