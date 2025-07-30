
// Here we will see how to create authentication routes in React using React Router

import { useNavigate } from "react-router";
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Flex } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/userSlice'
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {

    // To access the Redux state using useDispatch hook
    const dispatch = useDispatch()

    // M2: Creating a form using Mantine's useForm hook
    const form = useForm({
        mode:'uncontrolled',
        initialValues: {
            email: 'test@gmail.com',
            password: 'test'
        },
    })

    // useNavigate is a hook that allows us to programmatically navigate to different routes
    const navigate = useNavigate();
    
    const submit = (e) => {

        e.preventDefault(); // Prevent the default form submission behavior
        
        // M1: Here we can get/extract the form data
        // const payload = {
        //     email: e.target.email.value,
        //     password: e.target.password.value
        // }

        // M2: Get the values from the form using Mantine's useForm hook
        const newpayload = form.getValues(); 

        // Here we will simulate a login process
        // In a real application, you would send this payload to your backend for authentication
        const dummyPayload = {
            email: `test@gmail.com`,
            password: "test"
        }

        // Check if the payload matches the dummy credentials
        // In a real application, you would check this against your backend response
        if (newpayload.email === dummyPayload.email && newpayload.password === dummyPayload.password) {
            // If the user is authenticated, navigate to the home page
            localStorage.setItem("isAuthenticated", true);  // Simulate authentication
            
            // To send the data into the Redux store
            dispatch(setUserData(newpayload))

            // replace will ensure that the user cannot go back to the login page
            navigate("/products", { replace: true });       
        } 
        else {
            // If the user is not authenticated, show an error message
            alert("Use test@gmail.com and test as email and password");
        }
    };


    
    return (
        <div style={{
            maxWidth: "400px",       // restrict width
            margin: "100px auto",    // center vertically & horizontally
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(3, 2, 2, 0.1)"
        }}>
            <h1 style={{ textAlign: "center" }}>Login Page</h1>
            
            {/* M1: Using a simple form with input fields */}
            {/* <form onSubmit={submit}>
                <input type="email" name="email" id=""  />
                <input type="password" name="password" id="" />
                <button type="submit">Login</button>
            </form> */}

            {/* M2: Using Mantine form hook */}
            <form onSubmit={submit}>
                <TextInput
                    label="Email"
                    placeholder="Email"
                    type="email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />

                <Group justify="center" mt="xl">
                    <Button type='submit'>Login</Button>
                </Group>  
            </form>  

            <Flex justify="center" align="center" mt="1rem">
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log('Login Successful:', response);
                        localStorage.setItem("isAuthenticated", true)
                        navigate("/products", { replace: true });
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </Flex>
            
        </div>
    );
}

export default LoginPage;