import type { Metadata } from "next";
import HeaderLogo from "@/components/brand/HeaderLogo";

export const metadata: Metadata = {
  title: "House of ECCOOZS | Coming Soon",
  description: "House of ECCOOZS is the upcoming lifestyle and commerce extension of ECCOOZS.",
};

export default function HouseComingSoonPage() {
  return (
    <main style={{minHeight:'100vh',background:'linear-gradient(135deg,#040c1c 0%,#071240 55%,#0b1a3e 100%)',color:'#fff',fontFamily:'DM Sans,Arial,sans-serif',display:'flex',flexDirection:'column'}}>
      <header style={{height:72,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',borderBottom:'1px solid rgba(255,255,255,.1)'}}>
        <a href="/welcome" aria-label="Back to ECCOOZS"><HeaderLogo width={168}/></a>
        <a href="/welcome" style={{color:'#cbd7ff',fontSize:14,textDecoration:'none'}}>Back to ECCOOZS</a>
      </header>
      <section style={{flex:1,display:'grid',placeItems:'center',padding:'7rem 6%'}}>
        <div style={{maxWidth:820,textAlign:'center'}}>
          <div style={{fontSize:12,fontWeight:800,letterSpacing:'.22em',textTransform:'uppercase',color:'#7895ff',marginBottom:18}}>Platform → Brand → Commerce</div>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:'clamp(3.4rem,8vw,7rem)',lineHeight:.95,margin:'0 0 22px'}}>House of<br/><span style={{color:'#7895ff'}}>ECCOOZS</span></h1>
          <p style={{maxWidth:650,margin:'0 auto',fontSize:'clamp(1rem,2vw,1.25rem)',lineHeight:1.8,color:'rgba(255,255,255,.62)'}}>The lifestyle, fashion and owned-commerce expression of ECCOOZS is being prepared with the same intentional, premium standard as the platform.</p>
          <div style={{display:'inline-flex',marginTop:34,padding:'12px 20px',borderRadius:999,border:'1px solid rgba(120,149,255,.35)',background:'rgba(120,149,255,.09)',fontWeight:800,letterSpacing:'.12em',fontSize:13,color:'#dce5ff'}}>COMING SOON</div>
        </div>
      </section>
      <footer style={{padding:'24px 5%',textAlign:'center',borderTop:'1px solid rgba(255,255,255,.08)',fontSize:12,color:'rgba(255,255,255,.35)'}}>© 2026 ECCOOZS Technologies LLC</footer>
    </main>
  );
}
