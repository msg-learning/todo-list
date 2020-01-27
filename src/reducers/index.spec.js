import reducer, {
    add,
    remove,
    update,
    loadStart,
    loadEnd
} from './index.js';


describe( 'reducers -> todo', () => {

    describe( 'default', () => {

        it( 'initializes the list as empty', () => {
            const state = reducer();

            expect( state ).toHaveProperty( 'list', [] );
        } );

        it( 'initializes the list as loading', () => {
            const state = reducer();

            expect( state ).toHaveProperty( 'loading', true );
        } );

    } );

    describe( 'add', () => {

        it( 'adds a todo to the list', () => {
            const item = { id: 0, text: 'test' };
            const state = reducer( undefined, add( item ) );

            expect( state.list ).toStrictEqual( [ item ] );
        } );

        it( 'appends elements at the beginning of the list', () => {
            const initialState = { list: [ { id: 0, text: 'test' } ] }
            const item = { id: 1, text: 'other test' };
            const state = reducer( initialState, add( item ) );

            expect( state.list ).toStrictEqual( [
                { id: 1, text: 'other test' },
                { id: 0, text: 'test' }
            ] );
        } );

    } );

    describe( 'remove', () => {

        it( 'doesn\'t throw on empty states', () => {
            const state = reducer( undefined, remove( 0 ) );

            expect( state.list ).toStrictEqual( [] );
        } );

        it( 'removes an element from the list', () => {
            const initialState = {
                list: [
                    { id: 0, text: 'test' },
                    { id: 1, text: 'other test' },
                    { id: 2, text: 'another test' }
                ]
            };
            const state = reducer( initialState, remove( 1 ) );

            expect( state.list ).toStrictEqual( [
                { id: 0, text: 'test' },
                { id: 2, text: 'another test' }
            ] );
        } );

    } );

    describe( 'update', () => {
        
        it( 'works on empty lists', () => {
            const todoToUpdate = { id: 1, text: 'todo' };
            const state = reducer( undefined, update( todoToUpdate ) );

            expect( state.list ).toStrictEqual( [] );
        } );

        it( 'does not perform any action if the id is not found', () => {
            const initialState = { list: [ { id: 0, text: 'todo' } ] };
            const todoToUpdate = { id: 1, text: 'todo' };
            const state = reducer( initialState, update( todoToUpdate ) );

            expect( state.list ).toStrictEqual( [ { id: 0, text: 'todo' } ] );
        } );

        it( 'updates the selected todo', () => {
            const initialState = {
                list: [
                    { id: 0, text: 'todo' },
                    { id: 10, text: 'other' }
                ]
            };
            const todoToUpdate = { id: 0, text: 'text' };
            const state = reducer( initialState, update( todoToUpdate ) );

            expect( state.list ).toStrictEqual( [
                { id: 0, text: 'text' },
                { id: 10, text: 'other' }
            ] );
        } );

    } );

    describe( 'load', () => {

        it( 'flags the status as loading', () => {
            const initialState = {};
            const state = reducer( initialState, loadStart() );

            expect( state ).toHaveProperty( "loading", true );
        } );

        it( 'flags the status as not loading', () => {
            const initialState = {};
            const state = reducer( initialState, loadEnd() );

            expect( state ).toHaveProperty( "loading", false );
        } );

    } );

} );
