import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, Stack, Text, useDisclosure, AlertDescription } from '@chakra-ui/react';

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
});

// Post Route Function
function AddTodo(){
    const [item, setItem] = useState('');
    const {todos, fetchTodos} = React.useContext(TodosContext);

    const handleInput = e => {
        setItem(e.target.value);
    }

    const handleSubmit = e => {
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }
        fetch('http://localhost:8000/todo', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newTodo)
        }).then(fetchTodos)
    }
    return(
        <form onSubmit={handleSubmit}>
            <InputGroup size="md">
                <Input pr="4.5rem" type='text' placeholder='Add a todo item' aria-label='Add a todo item' onChange={handleInput}></Input>
            </InputGroup>
        </form>
    )
}

// Put Todo [Update the todo item]
function UpdateTodo({item,id}){
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [todo, setTodo] = useState(item);
    const {fetchTodos} = React.useContext(TodosContext);

    const updateTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({item:todo})
        })
        onClose()
        await fetchTodos()
    }
return(
    <>
        <Button h="2rem" fontSize="1rem" fontWeight="bold" colorScheme='twitter' borderRadius="10px" boxShadow="md" _hover={{
            bg:"facebook.500"
        }} size="sm" onClick={onOpen}>
            Update Todo
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup size="md">
                            <Input pr="4.5rem" type="text" placeholder='Update a todo item' aria-label='Update a todo item' value={todo} onChange={e => setTodo(e.target.value)}></Input>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button h="2rem" fontSize="1rem" fontWeight="bold" colorScheme='twitter' borderRadius="10px" boxShadow="md" _hover={{
                            bg:"facebook.500"
                        }} size="sm" onClick={updateTodo}>
                            Update Todo
                        </Button>
                    </ModalFooter>
                </ModalContent>
        </Modal>
    </>
)
}

// Delete Todo [Delete the todo item]
function DeleteTodo({id}){
    const {fetchTodos} = React.useContext(TodosContext);

    const deleteTodo = async () => {
        await fetch(`http://localhost:8000/todo/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type" : "application/json"},
            body: {"id":id}
        })
        await fetchTodos()
    }
    return(
        <Button h="2rem" fontSize="1rem" fontWeight="bold" colorScheme='yellow' boxShadow="md" _hover={{bg:"red.500"}} size="sm" onClick={deleteTodo}> Delete Button</Button>
    )
}

// Todo Helper Function for rendering todos
function TodoHelper({item,id,fetchTodos}){
    return(
        <Box p={1} shadow="sm">
            <Flex justify="space-between">
                <Text mt={4} as="div">
                    {item}
                    <Flex align="end">
                        <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}></UpdateTodo>
                        <DeleteTodo id={id} fetchTodos={fetchTodos}></DeleteTodo>
                    </Flex>
                </Text>
            </Flex>
        </Box>
    )
}

// Create functional component Todos
export default function Todos(){
    const [todos, setTodos] = useState([]);
    const fetchTodos = async () => {
        const response = await fetch('http://localhost:8000/todo');
        const todos = await response.json();
        setTodos(todos.data);
    }
    useEffect(() => {
        fetchTodos();
    },[])

    return (
        <TodosContext.Provider value={{todos, fetchTodos}}>
            <AddTodo></AddTodo>
            <Stack spacing={5}>
                {todos.map((todo) => (
                    // <b>{todo.item}</b>
                    <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos}></TodoHelper>
                ))}
            </Stack>
        </TodosContext.Provider>
    )
}