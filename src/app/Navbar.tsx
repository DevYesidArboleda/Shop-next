import Link from 'next/link'
import { auth } from "../../auth"
import LogoutButton from '@/components/logout-button'

const  Navbar: React.FC = async () => {
  const session = await auth()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold pr-3">
          Project Manager
        </Link>
        <div className="space-x-4 sm:flex grid justify-start items-start">
          <Link href="/dashboard" className="hover:text-gray-300 ml-4">
            Dashborad
          </Link>
          {session?.user.role === 'admin' && (
            <Link href="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}
          {session ? (
            <>
              <Link href="/project" className="hover:text-gray-300">
                Create Project
              </Link>
              <span>{session.user.email}</span>
              <LogoutButton/>
            </>
          ) : (
            <a href='/login' className="hover:text-gray-300">
                Sign in
              </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar