import { Flex, Heading } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";

const Loader = () => {
  return (
    <Flex h="100vh" align="center" justify="center" direction="column">
      <CircularProgress isIndeterminate color="teal.500" />
      <Heading m="5" color="teal.500">
        Loading
      </Heading>
    </Flex>
  );
};

export default Loader;
