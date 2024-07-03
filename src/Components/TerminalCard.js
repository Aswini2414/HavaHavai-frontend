import { View, Flex, Heading, Text, ActionButton } from "@adobe/react-spectrum";
import More from "@spectrum-icons/workflow/More";
import { IoIosMore } from "react-icons/io";

const TerminalCard = ({ title, description,image }) => {
  return (
    <View
      backgroundColor="gray-200"
      borderRadius="medium"
      maxWidth="size-3600"
      marginBottom="size-200"
    >
      <Flex
        direction="row"
        alignItems="center"
        position="relative"
        height="100%"
      >
        <img
          src={`${image}`}
          alt={title}
          style={{ height:"100%",width:"30%"}}
        />
        <View marginStart="size-100" paddingX="size-200">
          <Flex direction="column">
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading level={4}>{title}</Heading>
              <IoIosMore className="text-2xl font-bold " />
            </Flex>
            <Text >{description}</Text>
          </Flex>
        </View>
      </Flex>
    </View>
  );
};

export default TerminalCard;
