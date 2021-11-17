import { getAuth } from 'firebase/auth'
const backendurl = process.env.NEXT_PUBLIC_BACKEND

export default () => {
  const query = async (name: string, query: string, variables?: Object) => {
    const res = await fetch(`${backendurl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then(res => {
        console.log(res)

        return res.json()
      })
      .catch(error => console.error({ error }))
    return res.data[name]
  }
  return {
    query,
  }
}
