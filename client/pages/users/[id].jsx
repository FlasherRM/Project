import {useRouter} from "next/router";
import Image from "next/image";

export default function User({user}) {
    const router = useRouter();
    const myLoader=({src})=>{
        return user.user.photo;
    }
    return (
        <>
            <h2>Name: {user.user.name}</h2>
            <h2>Email: {user.user.email}</h2>
            <h2>Phone: {user.user.phone}</h2>
            <h2>Position: {user.user.position}</h2>
            <Image loader={myLoader} src={user.user.photo} width={200} height={200} />
        </>


    )
}
User.getInitialProps = async (router) => {
    const response = await fetch(`http://localhost:5000/api/v1/users/${router.query.id}`)
    const user = await response.json()
    return {
        user
    }
}