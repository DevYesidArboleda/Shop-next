import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar: React.FC = () => {
  const { data: session }: any = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Project Manager
        </Link>
        <div className="space-x-4">
          <Link href="/projects" className="hover:text-gray-300">
            Projects
          </Link>
          {session?.user?.role === 'admin' && (
            <Link href="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          )}
          {session ? (
            <>
              <span>{session.user?.email}</span>
              <button onClick={() => signOut()} className="hover:text-gray-300">
                Sign out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="hover:text-gray-300">
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar