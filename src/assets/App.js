import lg from './landing_graphic.svg';
import triangle from './triangle.svg';


import * as React from "react"
import {useState, setState} from "react"

import { Box, ChakraProvider, Flex, Spacer} from "@chakra-ui/react"
import { Grid, GridItem} from "@chakra-ui/react"
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Heading, Text } from "@chakra-ui/react"
import { Center, Square, Circle } from "@chakra-ui/react"
import { Button, ButtonGroup, Input, Image} from "@chakra-ui/react"

import { Icon } from "@chakra-ui/react"
import { MdGroupWork, MdRoom } from "react-icons/md"

// import Fonts from "./Fonts"
// import "@fontsource/poppins/800.css"
// import "@fontsource/poppins"
import "@fontsource/poppins/200.css"
import theme from "./theme"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import {
  useDisclosure
} from "@chakra-ui/react"


function BG() {
  return (
    <>
      {/* landing image */}
      <Image w="70%" h="70%" 
      pos="fixed" 
      bottom="0"
      right="-10vw"
      zIndex={-1}
      src={lg}/>

      {/* triangle */}
      <Image w="100vw" h="100vh" 
        pos="fixed" 
        bottom="0"
        right="0"
        zIndex={-2}
        src={triangle}/>
    </>
  )
}

function Header() {
  return (
    <>
      {/* HEADER */}
      <HStack h="10%">
          <Box p="1%" m="1%">
            <HStack>
              <Icon as={MdGroupWork} w="30%" h="30%" color="blue.500" />
              <Heading>LECTURE PARTY</Heading>
            </HStack>
          </Box>
        </HStack>
    </>
  )
}

function Join() {
  const textPercent = 20
  const hstackPercent = "100%"

  return (
    // <Center h="100%" w="100%">
      <Box h="100%" w="100%">
        <VStack>
          <Heading>Join room</Heading>

          <HStack w={hstackPercent}>
            <Text w={textPercent + "%"}>Room code</Text>
            <Input w={(100-textPercent) + "%"} placeholder="Enter code" />
          </HStack>

          <HStack w={hstackPercent}>
            <Text w={textPercent + "%"}>Nickname</Text>
            <Input w={(100-textPercent) + "%"} placeholder="Enter nickname" />
          </HStack>

          <HStack>
            <Button visibility="hidden"/>
          </HStack>

          {/* <Button w="30%">Go</Button> */}
        </VStack>
      </Box>
    //</Center>
  )
}

function Create() {
  const [privacy, setPrivacy] = useState(null);
  const textPercent = 20
  const fillButton = <Button w="11%" visibility="hidden"/>
  const hstackPercent = "100%"

  return (
    // <Center h="100%" w="100%">
      <Box h="100%" w="100%" bg="white">
        <VStack>
          <Heading>Create room</Heading>

          <HStack w={hstackPercent}>
            <Text w={textPercent + "%"}>Lecture link</Text>
            <Input w={(100-textPercent) + "%"} placeholder="Enter link" />
          </HStack>

          <HStack w={hstackPercent}>
            <Text w={textPercent + "%"} >Nickname</Text>
            <Input w={(100-textPercent) + "%"} placeholder="Enter nickname" />
          </HStack>

          <HStack w={hstackPercent}>
            <Text w={textPercent + "%"} >Privacy</Text>
            <Center w={(100-textPercent) + "%"}>
              <ButtonGroup w="100%">
              {fillButton}
              <Button w="33%"
                disabled={privacy == 1}
                onClick={() => setPrivacy(1)}>Public</Button>
              {fillButton}
              <Button w="33%"
                disabled={privacy == 2}
                onClick={() => setPrivacy(2)}>Private</Button>
              </ButtonGroup>
              {fillButton}
            </Center>
          </HStack>

          {/* <Button w="30%">Go</Button> */}
        </VStack>
      </Box>
    // </Center>
  )
}

function getButton (props) {
  return(
    <Button w="15vw" h="10vh" 
      fontSize = "xl"
      borderRadius="50px" 
      disabled={props.form == props.id}
      onClick={() => {props.setForm(props.id);props.modalOpen();}}
      
      bg = {props.bg}
      color = {props.fg}
        
        >{props.text}</Button>
  )
}



function App() {
  const [form, setForm] = useState(0);
  // const bg1 = "gray.100"
  // const bg1 = "white"
  // const bg2 = "white"

  const bg1 = "transparent"
  const bg2 = "transparent"

  const rows = 4
  const cols = 5

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraProvider theme={theme}>
        <BG/>
        <Header/>

        {/* bruh if anything fucks up change this */}
        <Box pos="absolute"> 
          <Grid
            h="80%" minH="80vh"
            templateRows={`repeat(${rows}, 1fr)`}
            templateColumns={`repeat(${cols}, 1fr)`}
            gap={4}
            >
            <GridItem rowSpan={rows} colSpan={1} bg={bg1} />

            <GridItem colSpan={cols - 2} bg={bg1}>
              <Center h="100%">
                <VStack align="left" p="5px">
                  <Heading size="3xl">WHERE STUDENTS</Heading>
                  {/* <HStack><Box w="5%"></Box><Heading>STUDENTS</Heading></HStack> */}
                  <Heading size="4xl">&nbsp;&nbsp;&nbsp;&nbsp;LEARN TOGETHER</Heading>
                  {/* <HStack><Box w="10%"></Box><Heading>LEARN TOGETHER</Heading></HStack> */}
                </VStack>
              </Center>
            </GridItem>

            <GridItem rowSpan={rows} colSpan={1} bg={bg1} />

            <GridItem colSpan={cols - 2} bg={bg1}>
              {/* <Center h="100%"> */}
                <ButtonGroup 
                  variant="solid" 
                  spacing="6"  
                >
                  {/* <Button w="15vw" h="10vh" 
                    fontSize = "xl"
                    borderRadius="50px" 
                    disabled={form == 1}
                    onClick={() => {setForm(1);onOpen();}}
                      >Create room</Button> */}

                  {getButton({
                    form: form,
                    setForm: setForm,
                    id: 1,
                    modalOpen: onOpen,
                    text: "Create room",
                    bg: "#FECD50",
                    fg: "#646464"
                  })}
                  
                  {/* <Button w="15vw" h="10vh" 
                    fontSize = "xl"
                    borderRadius="50px"
                    disabled={form == 2}
                    onClick={() => {setForm(2);onOpen();}}
                      >Join room</Button> */}

                  {getButton({
                    form: form,
                    setForm: setForm,
                    id: 2,
                    modalOpen: onOpen,
                    text: "Join room",
                    bg: "#72AAFF",
                    fg: "#FFFFFF"
                  })}

                </ButtonGroup>
              {/* </Center> */}
            </GridItem>

            <GridItem rowSpan={rows/2} colSpan={cols - 2} bg={bg1}>
              <Center minH="100%">
                {/* {form == 1 ? <Create/> : null}
                {form == 2 ? <Join/> : null} */}
              </Center>
            </GridItem>
          </Grid>

        <Modal isOpen={isOpen} onClose={() => {onClose(); setForm(0)}} 
          isCentered size="xl">
          <ModalOverlay />
          <ModalContent 
            // minW="30%"
          >
            {/* <ModalHeader>{form == 1 ? "Create room" : "Join room"}</ModalHeader> */}
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody 
              // w="100%"
              // bg = "black"
            >
              {form == 1 ? <Create/> : null}
              {form == 2 ? <Join/> : null}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Go
              </Button>
              <Button variant="ghost" onClick={() => {onClose(); setForm(0)}}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </Box>

    </ChakraProvider>
  );
}

export default App;
