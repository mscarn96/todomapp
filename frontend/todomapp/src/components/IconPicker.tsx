import { Button, IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, HStack } from "@chakra-ui/layout";
import { useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/radio";
import Icon from "@iconify/react";
import { FunctionComponent } from "react";
import icons from "../assets/icons";

const RadioCard: FunctionComponent<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const IconPicker = () => {
  const options = [icons.bankIcon, icons.castleIcon, icons.churchIcon];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: options[0],
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            <Button>
              <Image boxSize="10" src={value} alt="icon" />
            </Button>
          </RadioCard>

          //TODO get radio working, destroy place component when hidden
        );
      })}
    </HStack>
  );
};

export default IconPicker;
