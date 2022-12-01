'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  username: string;
  sub: number,
  iat: number,
}

async function getProfile(token:string){
  const res = await fetch('https://glyph.lab.hi.u-tokyo.ac.jp/auth/profile',{
    cache:'no-cache',
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  console.log(data)
  return data
}

function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>();
  let accessToken:string;

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile(accessToken);
      setProfile(profile);
    };
    fetchProfile();
    accessToken = localStorage.getItem("accessToken") || "";
    if (!accessToken) {
      router.push("/user/login");
    }
  }, []);
  
  console.log(profile)

  return (
    <div>
      {profile?.username }
    </div>
  )
}

export default ProfilePage