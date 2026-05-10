import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebase';
 
export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  username?: string;
  level: number;
  weeklyPoints: number;
  postcode?: string;
}
 
export async function getLeaderboard(): Promise<LeaderboardUser[]> {
  const q = query(
    collection(db, 'users'),
    orderBy('weeklyPoints', 'desc'),
    limit(50),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc, i) => ({
    id: doc.id,
    rank: i + 1,
    ...(doc.data() as any),
  }));
}
 
export async function getPostcodeLeaderboard(postcode: string): Promise<LeaderboardUser[]> {
  if (!postcode) return [];
  const clean = postcode.toUpperCase().trim();
  const q = query(
    collection(db, 'users'),
    where('postcode', '==', clean),
    orderBy('weeklyPoints', 'desc'),
    limit(50),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc, i) => ({
    id: doc.id,
    rank: i + 1,
    ...(doc.data() as any),
  }));
}
 
/** Returns {rank, total} for a user's postcode this week */
export async function getPostcodeRank(
  uid: string,
  postcode: string,
): Promise<{ rank: number; total: number }> {
  const users = await getPostcodeLeaderboard(postcode);
  const rank  = users.findIndex(u => u.id === uid) + 1;
  return { rank: rank > 0 ? rank : users.length + 1, total: users.length };
}
 