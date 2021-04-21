import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

interface IResultModal {
  isSuccess: boolean;
  isOpen: boolean;
  onClose: () => void;
  msg: string;
}

const ResultModal = (props: IResultModal) => {
  const { isSuccess, isOpen, onClose, msg } = props;

  const color = isSuccess ? "green.700" : "red.700";

  const headText = isSuccess ? "Success!" : "Error!";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="5" justifyContent="center" alignItems="center">
        <ModalHeader color={color}>{headText}</ModalHeader>
        <ModalBody>
          <p>{msg}</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
