// External
import Dexie from 'dexie';

const db = new Dexie( 'msg-todos' );
db.version(1).stores({
    todos: 'id, text, status'
} );

// Initial state
const initialState = {
    list: [],
    isLoading: true
};

// Actions
export const SET = 'todos/set';
export const ADD = 'todos/add';
export const REMOVE = 'todos/remove';
export const UPDATE = 'todos/update';
export const LOAD = 'todos/load';

// States
export const LOAD_START = 'todos/load/start';
export const LOAD_END = 'todos/load/end';
export const LOAD_ERROR = 'todos/load/error';


// Action creators
export const add = todo => ( {
    type: ADD,
    payload: todo
} );

export const remove = id => ( {
    type: REMOVE,
    payload: id
} );

export const update = todo => ( {
    type: UPDATE,
    payload: todo
} );

export const loadStart = () => ( {
    type: LOAD_START
} );

export const loadEnd = () => ( {
    type: LOAD_END
} );

export const set = list => ( {
    type: SET,
    payload: list
} );

export const load = () => async dispatch => {
    dispatch( loadStart() );
    const todos = await db.todos
        .reverse()
        .sortBy( 'creationDate' )
    dispatch( set( todos ) );
    dispatch( loadEnd() );
};

export const save = todo => async dispatch => {
    dispatch( loadStart() );
    await db.todos.add( {
        ...todo,
        status: todo.status || 'todo',
        creationDate: Date.now()
    } );
    dispatch( add( todo ) );
    dispatch( loadEnd() );
};

export const done = id => async dispatch => {
    dispatch( loadStart() );
    const result = await db.todos.update(
        id,
        { status: 'done' }
    );
    const todo = await db.todos
        .where( 'id' )
        .equals( id )
        .first();
    dispatch( update( todo ) );
    dispatch( loadEnd() );
};

const 



const reducer = ( state = initialState, event ) => {
    switch ( event?.type ) {
        case SET :
            return {
                ...state,
                list: event.payload
            };
        case ADD :
            return {
                ...state,
                list: [
                    event.payload,
                    ...state.list
                ]
            };
        case REMOVE :
            return {
                ...state,
                list: state.list.filter( todo => todo.id !== event.payload )
            };
        case UPDATE :
            return {
                ...state,
                list: state.list.map(
                    todo => todo.id === event.payload.id ? event.payload : todo
                )
            };
        case LOAD_START :
            return {
                ...state,
                isLoading: true
            };
        case LOAD_END :
            return {
                ...state,
                isLoading: false
            };
        default :
            return state;
    }
};


export default reducer;
