import React from 'react'
import './styles/product.css'

// Simple function component
function Welcome() {
    return (
        <h1>Welcome to My Website.</h1>
    )
};

// Arrow function component
const Greeting = () => {
    return (
        <h2>Hello, User!</h2>
    )
};

// Component with implicit return
const SimpleButton = () => <button>Click Me!</button>;

// Component with parameters
function UserGreeting(props) {
    return <h1>Welcome back, {props.name}!</h1>;
}

// Modern destructured props
const ProductCard = ({ title, price, description }) => {
    return (
        <div className='product-card'>
            <h3>{title}</h3>
            <p className='price'>Price: ${price}</p>
            <p className='description'>{description}</p>
        </div>
    )
};

const BasicFunctionalComponent = () => {
    return (
        <div>
            <h1>Basic Functional Component</h1>

            <Welcome />
            <br />

            <Greeting />
            <br />

            <SimpleButton />
            <br />

            <UserGreeting name="Bishal" />
            <br />

            <ProductCard
                title="Sample Product"
                price="99.99"
                description="This is a good product"
            />
        </div>
    )
}

export default BasicFunctionalComponent