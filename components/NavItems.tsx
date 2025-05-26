"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Companions', href: '/companions' },
    { name: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
    const pathname = usePathname()
    return (
        <nav className="flex items-center gap-4">
            {navItems.map((item) => (
                <Link key={item.name} href={item.href} className={`${pathname === item.href && 'text-primary font-semibold'}`}>
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems