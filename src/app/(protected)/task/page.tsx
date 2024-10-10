import LogoutButton from "@/components/logout-button"
import { auth } from "../../../../auth"
import Navbar from "@/app/Navbar"
import FormCreateTask from "@/components/form-task"
 
export default async function TaskPage() {
  const session = await auth()
 
  if (!session) {
    return <div>Not authenticated</div>
  }
 
  return (
    <div className="container">
      <Navbar/>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <FormCreateTask />
    </div>
  )
}