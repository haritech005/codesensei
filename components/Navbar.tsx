import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src={"/images/logo.png"}
                        alt="Logo"
                        width={100} height={44}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                {/* signed out means show the sign in button   */}
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                {/* if signed in means show user button this is the logic */}
                <SignedIn>
                    <UserButton />
                </SignedIn>

            </div>
        </nav>
    )
}

export default Navbar