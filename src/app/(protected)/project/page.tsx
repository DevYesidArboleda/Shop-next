import LogoutButton from "@/components/logout-button"
import { auth } from "../../../../auth"
import Navbar from "@/app/Navbar"
import FormProject from "@/components/form-project"
 
export default async function ProjectPage() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      <Navbar/>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <FormProject/>
    </div>
  )
}