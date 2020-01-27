// External
import React, { useState } from 'react';
import nanoid from 'nanoid';

const Form = ( { onSubmit } ) => {
    
    const [ text, setText ] = useState( '' );

    const handleSubmit = event => {

        event.preventDefault();

        onSubmit( {
            text,
            id: nanoid()
        } );

        setText( '' );

    };

    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="text">
                    Todo content
                </label>
                <input
                    id="text"
                    type="text"
                    placeholder="What's next?"
                    value={ text }
                    onChange={ e => setText( e.target.value ) }
                />
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    );
};


export default Form;

