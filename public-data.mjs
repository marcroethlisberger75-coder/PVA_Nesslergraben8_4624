import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";
import seed from "./seed.json" with { type: "json" };
const secret=()=>process.env.OWNER_TOKEN_SECRET||process.env.ADMIN_TOKEN_SECRET||"";
const sign=s=>crypto.createHmac("sha256",secret()).update(s).digest("hex");
const valid=req=>{const h=req.headers.get("authorization")||"";const token=h.startsWith("Bearer ")?h.slice(7):"";const [raw,sig]=token.split(".");if(!raw||!sig||!secret()||Number(raw)<Date.now())return false;try{return crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(sign(raw)))}catch{return false}};
export default async(req)=>{if(!valid(req))return Response.json({error:"Unauthorized"},{status:401});try{const s=getStore("pv-data");const x=await s.get("aggregate",{type:"json"});return Response.json(x||{days:seed.days||[],settings:null});}catch{return Response.json({days:seed.days||[],settings:null});}};