import Home from "./index";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function Login({ positions }) {
    const [token, setToken] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/token')
            .then((res) => res.json())
            .then((data) => {
                setToken(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!token) return <p>No profile data</p>
    return (
        <>
            <Head>
                <meta name="token" content={`${token.token}`}/>
            </Head>
            <p>Here is the token:</p><p>{token.token}</p>
            <form encType='multipart/form-data' action="    http://localhost:5000/api/v1/users" method="POST">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" required/> <br/>
                <label htmlFor="name">Email</label>
                <input id="email" type="email" name="email" required/> <br/>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="phone" name="phone" required/> <br/>
                <label htmlFor="position">Choose a position:</label>
                <select name='position' required id="position">
                    {positions.positions.map(position => (
                        <option key={position.id} value={`${position.id}`}>{position.name}</option>
                    ))}
                </select> <br/>
                <label htmlFor="photo">Choose your photo</label>
                <input id='photo' type="file" name='photo' required/>
                <button type="submit">Register</button>
            </form>
        </>
    )
}
Login.getInitialProps = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/positions`)
    const positions = await response.json()
    return {
        positions
    }
}