import withAuth from '@/lib/components/withAuth'
import Editor from '@/lib/components/Editor'

const page = ({session, ids}) => {
  return (
    <Editor docId={ids[0]} userId={session.user.id} />
  )
}

export default withAuth(page)