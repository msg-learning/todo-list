// External
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// Application
import Todo from './Todo.js';
import Form from './TodoForm.js';

import { save, remove, done, load } from './reducers/index.js';


const App = ( { todos, done, load, isLoading, add, remove } ) => {

    useEffect( () => {
        load();
    }, [] );

    return isLoading
        ? <div>Loading</div>
        : (
            <Fragment>

                <ol>
                    { todos.map( todo => (
                        <Todo
                            key={ todo.id }
                            onDelete={ remove } 
                            onDone={ done }
                            { ...todo }
                        />
                    ) ) }
                </ol>

                <Form onSubmit={add} />
            </Fragment>
        );
};

const mapStateToProps = state => ( {
    todos: state.todo.list,
    loading: state.todo.isLoading
} );

const mapDispatchToProps = dispatch => ( {
    done: id => dispatch( done( id ) ),
    load: () => dispatch( load() ),
    add: todo => dispatch( save( todo ) ),
    remove: id => dispatch( remove( id ) )
} );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( App );
