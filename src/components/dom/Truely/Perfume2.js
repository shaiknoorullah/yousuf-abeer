import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useInView } from "@react-spring/three";
import { motion, useAnimation } from "framer-motion";
import React, { useRef, useEffect } from "react";

const Perfume2 = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  const parentVariant = {
    start: {
      x: "100",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <Box
      ref={ref}
      as={motion.div}
      variants={parentVariant}
      initial="start"
      animate={controls}
      display={{ md: "flex", base: "none" }}
      gap={{ md: "3vw", "2xl": "3rem" }}
    >
      <Box>
        <Image
          w={{ md: "16vw", "2xl": "250px", "3xl": "280px" }}
          src="/images/perfume2.png"
        />
      </Box>
      <Flex flexDir={"column"} gap={{ md: "0.85vw", "2xl": "1rem" }}>
        <Heading
          fontFamily="novara"
<<<<<<< HEAD
          fontSize={{ md: "3.25vw", "2xl": "3.5rem" }}
          fontWeight="400"
          lineHeight={{ md: "3.8vw", "2xl": "3.8rem" }}
          maxWidth={{ md: "15vw", "2xl": "250px" }}
=======
          fontSize={{ base: "34px", lg: "3vw", xl: "4rem" }}
          fontWeight={{ base: "500", md: "1000px", lg: "600px" }}
          maxW="14vw"
          // letterSpacing={"2px"}
>>>>>>> 1b7ab967813b32e16af9824494d55498c6a7ac71
        >
          Eau de parfum spray
        </Heading>
        <Text
          fontFamily="gilroy"
<<<<<<< HEAD
          maxW="30ch"
          fontSize={{ md: "0.85vw ", "2xl": "1.025rem" }}
          lineHeight={{ md: "1.46vw", "2xl": "1.75rem" }}
          letterSpacing={{ md: "2.5px" }}
=======
          fontSize={{ lg: "0.8vw ", base: "16px" }}
          lineHeight={{ lg: "27px", base: "17px" }}
          letterSpacing={{ lg: "2px", base: "6%" }}
>>>>>>> 1b7ab967813b32e16af9824494d55498c6a7ac71
        >
          Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod
          temp incididunt ut labore et dolore magna aliqua.
        </Text>
      </Flex>
    </Box>
  );
};

export default Perfume2;
