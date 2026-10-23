import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";
export default function Icon(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#173a34",borderRadius:"48px",border:"6px solid #d1a15f",color:"#f6f3ee",fontSize:"86px",fontWeight:700,letterSpacing:"-8px"}}>VIS</div>,{...size});}
