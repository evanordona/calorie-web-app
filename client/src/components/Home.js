import React, { useEffect } from 'react'

const Home = () => {

    const [goal, setGoal] = React.useState(0);

    return (
        <div>
            <div>Count: {goal}</div>


        </div>
    )
}

export default Home