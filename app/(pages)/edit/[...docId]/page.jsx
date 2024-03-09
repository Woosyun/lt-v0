"use client"
import Editor from '@/lib/editor/Editor';
import withAuth from '@/lib/components/withAuth'

const page = ({session, params}) => {
  const userId = session.user.id;
  const docId = params.docId[0];


  return (
    <Editor userId={userId} docId={docId} />
  )
}

export default withAuth(page)