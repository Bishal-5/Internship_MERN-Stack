import React from 'react'

const AdvancedIntro03 = () => {

    // const badExample = (
    //     <h1>Title</h1>
    //     <p>Description</p>
    // );

    const goodExample = (
        <div>
            <h1>Title</h1>
            <p>Description</p>
        </div>
    );

    // Alternative - Using React fragment (Newest Version)
    const ReactFragment = (
        <>
            <h1>Title</h1>
            <p>Desccription</p>
        </>
    );

    // Anternative - using React.Fragment explicity (Old Version)
    const explicityFragment = (
        <React.Fragment>
            <h1>Title</h1>
            <p>Description</p>
        </React.Fragment>
    );

    return (
        <div>
            <h1>JSX must return a single parent element</h1>
            {goodExample}
            <br />
            {ReactFragment}
            <br />
            {explicityFragment}
        </div>
    )
}

export default AdvancedIntro03