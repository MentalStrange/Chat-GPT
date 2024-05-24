import { useState } from 'react';
import axios from 'axios';
import { Button, Flex, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";
import image from "../assets/login-form-img.png";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setLoading(false);
      navigate('/chat');
      console.log('Login successful:', res.data);
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Flex width="60%" justifyContent="space-between" alignItems="center">
        <Image src={image} alt="Image" boxSize="50%" objectFit="cover" />
        <Stack spacing={4} width={"400px"} p={6} boxShadow={"lg"} borderRadius={"lg"} bg={"white"}>
          <Heading as={"h3"} textAlign={"center"} fontWeight={"bold"}>
            Log In
          </Heading>
          <form onSubmit={onSubmit}>
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              mb={3}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              mb={3}
            />
            <Button
              type="submit"
              width={"full"}
              backgroundColor={"#9747FF"}
              color={"white"}
              _hover={{ backgroundColor: "#AC6BFF" }}
              isLoading={loading}
            >
              Log in
            </Button>
          </form>
        <Text textAlign={"center"}>Don`t have an account? <Link color={"#9747FF"}  to={"/register"}>Sign Up</Link></Text>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Login;
