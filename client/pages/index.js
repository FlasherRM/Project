import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
    const [users, setUsers] = useState(null)
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false)
    const [isAll, setIsAll] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/api/v1/users?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users)
                setLoading(false)
            })
        setPage(page + 1);
    }, [])

    const fetchObjects = () => {
        setLoading(true)
        fetch(`http://localhost:5000/api/v1/users?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                if(data.page == data.total_pages) {
                    setIsAll(true)
                }
                data.users.map(user => {
                    users.push(user)
                })
                setUsers(users)
                setLoading(false)
            })
            .finally(() => {
                setUsers(users)
            })
        setPage(page + 1);
    }

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No users data</p>

    if(users.success === false) {
        return (
            <div>
                <h1>I don't have any users!</h1>
                <Link href={'/login'}><a>Create a new user</a></Link>
            </div>

        )
    } else {
        if(isAll === false) {
            return (
                <div>
                    <h1>Here is the list of users</h1>
                    <Link href={'/login'}><a>Create a new user</a></Link>
                    <ul>
                        {users.map(user => (
                            <li key={'key' + user.id}><Link href={'http://localhost:3000/users/' + user.id}><a>{user.name}</a></Link></li>
                        ))}
                    </ul>
                    <button onClick={fetchObjects}>Load more</button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Here is the list of users</h1>
                    <Link href={'/login'}><a>Create a new user</a></Link>
                    <ul>
                        {users.map(user => (
                            <li key={'key' + user.id}><Link href={'http://localhost:3000/users/' + user.id}><a>{user.name}</a></Link></li>
                        ))}
                    </ul>
                </div>
            )
        }


    }

}
