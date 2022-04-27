import styles from '../styles/Home.module.css'
import React, {useState} from "react";
import Link from "next/link";

export default function Home({ users }) {
    if(users.success == false) {
        return (
            <div>
                <h1>I don't have any users!</h1>
                <Link href={'/login'}><a>Create a new user</a></Link>
            </div>

        )
    } else {
        return (
            <div>
                <h1>Here is the list of users</h1>
                <Link href={'/login'}><a>Create a new user</a></Link>
                <ul>
                    {users.users.map(user => (
                        <li key={'key' + user.id}><Link href={'http://localhost:3000/users/' + user.id}><a>{user.name}</a></Link></li>
                    ))}
                </ul>
            </div>
        )
    }

}

Home.getInitialProps = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/users?page=1`)
    const users = await response.json()

    return {
        users
    }
}
