// External
import React from 'react';
import styled from 'styled-components';

// Application
import ActionButton from './ActionButton.js';


export const ListItem = styled.li`
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Text = styled.span`
    font-weigth: bold;
`

export const Id = styled.span`
    margin-left: auto;
    font-size: 50%;
`;

export const Edit = styled(ActionButton)`
    background-color: teal;
    color: white;
`;

export const Delete = styled(ActionButton)`
    background-color: red;
    color: white;
`;

export const Done = styled(ActionButton)`
    background-color: green;
    color: white;
`;

const Todo = ( { text, id, status, onEdit, onDelete, onDone } ) =>
    <ListItem>
        <Text>
            { text }
        </Text>
        <Id>
            { id }
        </Id>
        { status !== 'done' && <Done onClick={ () => onDone( id ) }>D</Done> }
        <Edit onClick={ () => onEdit( id ) }>E</Edit>
        <Delete onClick={ () => onDelete( id ) }>R</Delete>
    </ListItem>;

export default Todo;

