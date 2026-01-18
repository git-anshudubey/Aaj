import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <header className='py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50 transition-all'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='mr-6'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto items-center gap-2'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-5 py-2 text-sm font-medium text-slate-700 hover:text-secondary hover:bg-slate-100 rounded-full transition-all duration-200'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header