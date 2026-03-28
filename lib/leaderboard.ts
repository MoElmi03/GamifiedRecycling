import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "./firebase"

export async function getLeaderboard() {
  const q = query(
    collection(db, "users"),
    orderBy("weeklyPoints", "desc"),
    limit(50)
  )

  const snap = await getDocs(q)

  const users = snap.docs.map((doc, index) => ({
    id: doc.id,
    rank: index + 1,
    ...doc.data()
  }))

  return users
}