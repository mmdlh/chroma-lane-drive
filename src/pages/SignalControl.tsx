import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import { MiniArea, MiniLine, COLORS } from "@/components/MiniChart";

const phaseData = [
  { id: "A", name: "东西直行", green: 35, yellow: 3, red: 42, status: "green" },
  { id: "B", name: "东西左转", green: 20, yellow: 3, red: 57, status: "red" },
  { id: "C", name: "南北直行", green: 40, yellow: 3, red: 37, status: "red" },
  { id: "D", name: "南北左转", green: 25, yellow: 3, red: 52, status: "red" },
];

const intersections = [
  { name: "人民路/建设路", mode: "自适应", cycle: 120, status: "正常" },
  { name: "中山路/解放路", mode: "固定配时", cycle: 90, status: "正常" },
  { name: "长江路/黄河路", mode: "感应控制", cycle: 100, status: "告警" },
  { name: "和平路/胜利路", mode: "自适应", cycle: 110, status: "正常" },
  { name: "文化路/科技路", mode: "协调控制", cycle: 130, status: "正常" },
  { name: "湖滨路/公园路", mode: "自适应", cycle: 95, status: "维护" },
];

const flowData = Array.from({ length: 20 }, (_, i) => ({ name: `${i}`, east: Math.random() * 100 + 50, west: Math.random() * 80 + 40, south: Math.random() * 90 + 30, north: Math.random() * 70 + 40 }));

const SignalControl = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Left - Phase control */}
      <div className="col-span-4 flex flex-col gap-3">
        <SciFiCard title="当前路口：人民路/建设路" elevated>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatValue label="周期时长" value={120} unit="秒" />
            <StatValue label="相位偏移" value={15} unit="秒" />
            <StatValue label="控制模式" value="自适应" color="hsl(150,80%,45%)" />
            <StatValue label="绿信比" value="58" unit="%" color="hsl(190,100%,50%)" />
          </div>
        </SciFiCard>

        <SciFiCard title="相位配时方案" accent="success">
          <div className="space-y-3">
            {phaseData.map((p) => (
              <div key={p.id} className="p-2 rounded-md bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs text-primary">{p.id}</span>
                    <span className="text-xs text-foreground">{p.name}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${p.status === "green" ? "bg-glow-success" : "bg-glow-danger"} animate-pulse-glow`} />
                </div>
                <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                  <div className="rounded-l-full" style={{ width: `${(p.green / 80) * 100}%`, background: "hsl(150,80%,45%)" }} />
                  <div style={{ width: `${(p.yellow / 80) * 100}%`, background: "hsl(45,100%,55%)" }} />
                  <div className="rounded-r-full flex-1" style={{ background: "hsl(0,70%,45%)" }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>绿{p.green}s</span><span>黄{p.yellow}s</span><span>红{p.red}s</span>
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>

      {/* Center - Intersection diagram */}
      <div className="col-span-5 flex flex-col gap-3">
        <SciFiCard title="路口信号灯状态模拟" elevated className="flex-1">
          <div className="relative w-full aspect-square max-h-[320px] mx-auto">
            {/* Intersection visualization */}
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Roads */}
              <rect x="120" y="0" width="60" height="300" fill="hsl(215,30%,12%)" stroke="hsl(190,100%,50%,0.2)" />
              <rect x="0" y="120" width="300" height="60" fill="hsl(215,30%,12%)" stroke="hsl(190,100%,50%,0.2)" />
              {/* Center */}
              <rect x="120" y="120" width="60" height="60" fill="hsl(215,30%,15%)" stroke="hsl(190,100%,50%,0.3)" />
              {/* Lane markings */}
              <line x1="150" y1="0" x2="150" y2="115" stroke="hsl(45,100%,55%,0.4)" strokeWidth="1" strokeDasharray="8,8" />
              <line x1="150" y1="185" x2="150" y2="300" stroke="hsl(45,100%,55%,0.4)" strokeWidth="1" strokeDasharray="8,8" />
              <line x1="0" y1="150" x2="115" y2="150" stroke="hsl(45,100%,55%,0.4)" strokeWidth="1" strokeDasharray="8,8" />
              <line x1="185" y1="150" x2="300" y2="150" stroke="hsl(45,100%,55%,0.4)" strokeWidth="1" strokeDasharray="8,8" />
              {/* Signal lights */}
              <circle cx="115" cy="115" r="8" fill="hsl(150,80%,45%)" filter="url(#glow)" />
              <circle cx="185" cy="115" r="8" fill="hsl(0,70%,50%)" filter="url(#glowRed)" />
              <circle cx="115" cy="185" r="8" fill="hsl(0,70%,50%)" filter="url(#glowRed)" />
              <circle cx="185" cy="185" r="8" fill="hsl(150,80%,45%)" filter="url(#glow)" />
              {/* Direction labels */}
              <text x="150" y="15" textAnchor="middle" fill="hsl(190,100%,70%)" fontSize="10" fontFamily="Noto Sans SC">北</text>
              <text x="150" y="295" textAnchor="middle" fill="hsl(190,100%,70%)" fontSize="10" fontFamily="Noto Sans SC">南</text>
              <text x="10" y="153" fill="hsl(190,100%,70%)" fontSize="10" fontFamily="Noto Sans SC">西</text>
              <text x="283" y="153" fill="hsl(190,100%,70%)" fontSize="10" fontFamily="Noto Sans SC">东</text>
              {/* Glow filters */}
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <filter id="glowRed"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
            </svg>
          </div>
        </SciFiCard>

        <SciFiCard title="各方向实时流量" accent="warning">
          <MiniLine data={flowData} lines={["east", "west", "south", "north"]} height={140} />
        </SciFiCard>
      </div>

      {/* Right - Intersection list */}
      <div className="col-span-3 flex flex-col gap-3">
        <SciFiCard title="路口列表" accent="primary">
          <div className="space-y-2">
            {intersections.map((inter) => (
              <div key={inter.name} className="p-2 rounded-md bg-secondary/30 sci-border-glow cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{inter.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${inter.status === "正常" ? "bg-glow-success/20 text-glow-success" : inter.status === "告警" ? "bg-glow-danger/20 text-glow-danger" : "bg-glow-warning/20 text-glow-warning"}`}>
                    {inter.status}
                  </span>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{inter.mode}</span>
                  <span>周期 {inter.cycle}s</span>
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="方案执行日志" accent="success">
          <div className="space-y-2 text-xs">
            {[
              { time: "14:30", msg: "人民路/建设路 切换自适应模式" },
              { time: "14:15", msg: "长江路/黄河路 告警：相位冲突" },
              { time: "13:50", msg: "中山路/解放路 配时方案更新" },
              { time: "13:20", msg: "和平路/胜利路 绿波带优化完成" },
              { time: "12:45", msg: "文化路/科技路 周期调整120→130s" },
            ].map((log, i) => (
              <div key={i} className="flex gap-2 p-1.5 rounded bg-secondary/20">
                <span className="text-primary whitespace-nowrap">{log.time}</span>
                <span className="text-muted-foreground">{log.msg}</span>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
};

export default SignalControl;
