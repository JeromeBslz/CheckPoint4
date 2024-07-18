import { Flex, Heading, Text, Input, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex p="2rem" direction="column" alignItems="center">
      <Heading as='h1' size='4xl' noOfLines={1} className="tasklist-title">
        Task List
      </Heading>
      <Text mt="1rem" className='tasklist-slogan'>
        TaskList est un outil open-source qui permet d'ajouter pour gérer vos tâches, ou les détruire tel AZF
      </Text>
    </Flex>
  );
};

export default Header;