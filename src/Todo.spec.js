// External
import React from 'react';
import { shallow } from 'enzyme';

// Application
import Todo, { Text, Id, Edit, Delete } from './Todo.js';


describe( '<Todo />', () => {

    it( 'displays the content', () => {
      const wrapper = shallow( <Todo text="value" /> );
      const text = wrapper.find( Text ).text()

      expect( text ).toStrictEqual( 'value' );
    } );

    it( 'displays the id', () => {
        const wrapper = shallow( <Todo id="-1" /> );
        const id = wrapper.find( Id ).text();

        expect( id ).toStrictEqual( "-1" );
    } );

    it( 'calls the edit function when clicked', () => {
        const onEdit = jest.fn();
        const wrapper = shallow(
            <Todo
                id="-1"
                onEdit={ onEdit }
            />
        );

        const EditButton = wrapper.find( Edit );
        EditButton.simulate( 'click' );

        expect( onEdit ).toHaveBeenCalledWith( "-1" );
    } );

    it( 'calls the delete function when clicked', () => {
        const onDelete = jest.fn();
        const wrapper = shallow(
            <Todo
                id="-1"
                onDelete={ onDelete }
            />
        );

        const DeleteButton = wrapper.find( Delete );
        DeleteButton.simulate( 'click' );

        expect( onDelete ).toHaveBeenCalledWith( "-1" );
    } );

} );
