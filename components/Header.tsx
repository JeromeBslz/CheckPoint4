import { Flex, Heading, Text, Input, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex p="2rem" direction="column" alignItems="center">
      <Heading as='h1' size='4xl' noOfLines={1} className="tasklist-title">
        Tout Doux List
      </Heading>
      <Text mt="1rem" className='tasklist-slogan'>
        Tout doux List est une application agréable et simple pour créer des tâches, ou les éradiquer.
      </Text>
    </Flex>
  );
};

export default Header;