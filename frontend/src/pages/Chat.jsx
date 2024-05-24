import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Button, Input, Heading, Stack } from '@chakra-ui/react';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('https://chat-gpt-xu1j.onrender.com/chat', { headers: { 'x-auth-token': token } })
        .then(res => setChat(res.data))
        .catch(err => console.error(err.response.data));
    }
  }, [token]);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://chat-gpt-xu1j.onrender.com/chat', { message }, { headers: { 'x-auth-token': token } });
      setChat([...chat, res.data]);
      setMessage('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"} bg={"gray.100"}>
        <Stack spacing={4} width={"60%"} p={6} boxShadow={"lg"} borderRadius={"lg"} bg={"white"}>
          <Heading as={"h3"} textAlign={"center"} fontWeight={"bold"}>
            Chat
          </Heading>
          <Box bg="gray.100" borderRadius="lg" p={4} height={"calc(100vh - 200px)"} overflowY="auto">
            {/* Chat Window */}
            <Flex direction="column">
              {chat.map((c, index) => (
                <Flex key={index} mb={2} alignItems="center">
                  <Box bg="blue.500" color="white" p={2} borderRadius="lg" mr={2}>
                    <Text>You:</Text>
                    <Text>{c.message}</Text>
                  </Box>
                  <Box bg="gray.200" color="black" p={2} borderRadius="lg">
                    <Text>Bot:</Text>
                    <Text>{c.response}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>
          <Flex mt={4}>
            <Input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message"
              className="form-control form-control-sm m-2 p-2"
            />
            <Button
              ml={2}
              type="submit"
              onClick={onSubmit}
              backgroundColor={"#9747FF"}
              color={"white"}
              _hover={{ backgroundColor: "#AC6BFF" }}
            >
              Send
            </Button>
          </Flex>
        </Stack>
      </Flex>
  );
}

export default Chat;
