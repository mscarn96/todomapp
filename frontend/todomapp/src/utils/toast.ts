import { createStandaloneToast } from "@chakra-ui/toast";

const toast = createStandaloneToast();

export const showSuccessToast = (title: string, description: string) => {
  toast({
    title,
    description,
    status: "success",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
};

export const showErrorToast = (title: string, description: string) => {
  toast({
    title,
    description,
    status: "error",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
};

export const showInfoToast = (title: string, description: string) => {
  toast({
    title,
    description,
    status: "info",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
};

export const showWarningToast = (title: string, description: string) => {
  toast({
    title,
    description,
    status: "warning",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
};
