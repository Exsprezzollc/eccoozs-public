"use client";

import { useEffect, useMemo, useState } from "react";

type Q = { text: string; answer: number; choices: number[] };

function makeQuestion(grade: number): Q {
  const r=(n:number)=>Math.floor(Math.random()*n)+1;
  let a=0,b=0,answer=0,text='';
  if(grade<=1){a=r(10);b=r(10);answer=a+b;text=`${a} + ${b}`;}
  else if(grade===2){a=r(30);b=r(20); if(Math.random()>.5){answer=a+b;text=`${a} + ${b}`;}else{const hi=Math.max(a,b),lo=Math.min(a,b);answer=hi-lo;text=`${hi} − ${lo}`;}}
  else if(grade===3){a=r(10);b=r(10);answer=a*b;text=`${a} × ${b}`;}
  else if(grade===4){a=r(12);b=r(12); if(Math.random()>.4){answer=a*b;text=`${a} × ${b}`;}else{answer=a;text=`${a*b} ÷ ${b}`;}}
  else if(grade===5){a=r(20);b=r(12);answer=a*b;text=`${a} × ${b}`;}
  else {a=r(24);b=r(12); if(Math.random()>.45){answer=a*b;text=`${a} × ${b}`;}else{answer=a;text=`${a*b} ÷ ${b}`;}}
  const set=new Set<number>([answer]);
  while(set.size<4){set.add(Math.max(0,answer+r(8)-4));}
  return {text,answer,choices:[...set].sort(()=>Math.random()-.5)};
}

export default function MathTrailPage(){
  const [grade,setGrade]=useState(1); const [stars,setStars]=useState(0); const [streak,setStreak]=useState(0); const [done,setDone]=useState(0); const [feedback,setFeedback]=useState(''); const [q,setQ]=useState<Q>(()=>makeQuestion(1));
  useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('eccoozs-math-trail-cloud')||'{}'); if(s.stars)setStars(s.stars); if(s.grade){setGrade(s.grade);setQ(makeQuestion(s.grade));} if(s.done)setDone(s.done);}catch{}},[]);
  useEffect(()=>{localStorage.setItem('eccoozs-math-trail-cloud',JSON.stringify({stars,grade,done}));},[stars,grade,done]);
  const pct=useMemo(()=>Math.min(100,done*5),[done]);
  function choose(n:number){if(n===q.answer){setFeedback('Great job! ⭐');setStars(v=>v+1);setStreak(v=>v+1);setDone(v=>v+1);setTimeout(()=>{setQ(makeQuestion(grade));setFeedback('');},500);}else{setFeedback('Good try — have another look.');setStreak(0);}}
  function speak(){if('speechSynthesis' in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(`What is ${q.text.replace('×','times').replace('÷','divided by').replace('−','minus')}?`);u.rate=.9;speechSynthesis.speak(u);}}
  return <main className="mt"><style>{`
    *{box-sizing:border-box}.mt{min-height:100vh;background:linear-gradient(#eaf7ff,#f6fbff);font-family:Arial,sans-serif;color:#09234a;padding:28px}.wrap{max-width:980px;margin:auto}.top{display:flex;justify-content:space-between;align-items:center;gap:14px}.brand{font-weight:900;font-size:26px}.brand span{color:#ff9c19}.pill{background:#fff;border:1px solid #cfe0ff;border-radius:999px;padding:10px 14px;font-weight:800}.hero{margin-top:26px;background:#fff;border:1px solid #cfe0ff;border-radius:24px;box-shadow:0 18px 50px #153f7d14;overflow:hidden}.head{padding:24px;background:linear-gradient(135deg,#0d4fa7,#083b83);color:#fff}.head h1{margin:0 0 5px;font-size:34px}.head p{margin:0;opacity:.8}.body{padding:24px}.grades{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.g{border:1px solid #d9e6ff;background:#f8fbff;border-radius:13px;padding:12px 8px;font-weight:800;cursor:pointer}.g.on{background:#1f6fff;color:#fff}.progress{height:10px;background:#e6eefc;border-radius:20px;overflow:hidden;margin:22px 0}.bar{height:100%;background:#44b65a}.question{padding:28px;border-radius:20px;background:#f4f8ff;text-align:center}.q{font-size:46px;font-weight:900;margin:8px}.speak{border:0;background:#e6efff;border-radius:10px;padding:9px 12px;cursor:pointer}.answers{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}.ans{font-size:24px;font-weight:900;padding:18px;border:1px solid #cbdcff;background:#fff;border-radius:14px;cursor:pointer}.ans:hover{background:#eef5ff}.feedback{height:28px;text-align:center;margin-top:15px;font-weight:800;color:#1f6fff}.links{margin-top:18px;text-align:center}.links a{color:#1f47e0;font-weight:800;text-decoration:none}@media(max-width:700px){.grades{grid-template-columns:repeat(3,1fr)}.answers{grid-template-columns:1fr}.q{font-size:38px}.mt{padding:14px}}
  `}</style><div className="wrap"><div className="top"><a href="/welcome" style={{textDecoration:'none',color:'inherit'}} className="brand"><span>●</span> MATH TRAIL</a><div className="pill">⭐ {stars} &nbsp; 🔥 {streak}</div></div><section className="hero"><div className="head"><h1>Build math confidence one step at a time.</h1><p>A guided ECCOOZS Learning adventure for Grades 1–6.</p></div><div className="body"><div className="grades">{[1,2,3,4,5,6].map(g=><button className={`g ${grade===g?'on':''}`} key={g} onClick={()=>{setGrade(g);setQ(makeQuestion(g));setFeedback('')}}>Grade {g}</button>)}</div><div className="progress"><div className="bar" style={{width:`${pct}%`}}/></div><div className="question"><div>Grade {grade} Trail · {pct}% explored</div><div className="q">{q.text} = ?</div><button className="speak" onClick={speak}>🔊 Read aloud</button><div className="answers">{q.choices.map(n=><button className="ans" key={n} onClick={()=>choose(n)}>{n}</button>)}</div><div className="feedback">{feedback}</div></div><div className="links"><a href="/learning">← All ECCOOZS Learning Apps</a></div></div></section></div></main>
}
