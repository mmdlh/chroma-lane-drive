import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import { MiniArea, MiniBar, MiniLine, MiniRadar } from "@/components/MiniChart";

const heatmapData = Array.from({ length: 7 }, (_, row) => 
  Array.from({ length: 24 }, (_, col) => Math.random())
);
const dayLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const congestionData = [
  { name: "畅通", value: 45 }, { name: "缓行", value: 30 }, { name: "拥堵", value: 18 }, { name: "严重", value: 7 }
];

const radarData = [
  { name: "通行效率", value: 85 }, { name: "延误指数", value: 60 }, { name: "饱和度", value: 72 },
  { name: "排队长度", value: 55 }, { name: "绿灯利用", value: 90 }, { name: "协调度", value: 78 }
];

const realtimeFlow = Array.from({ length: 30 }, (_, i) => ({
  name: `${i}`, main: Math.random() * 200 + 100, side: Math.random() * 100 + 30
}));

const topRoads = [
  { name: "人民路", flow: 1250, speed: 35, delay: 45 },
  { name: "中山路", flow: 1180, speed: 28, delay: 62 },
  { name: "建设路", flow: 980, speed: 42, delay: 28 },
  { name: "解放路", flow: 920, speed: 38, delay: 35 },
  { name: "长江路", flow: 860, speed: 45, delay: 22 },
];

const TrafficMonitor = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Top stats */}
      <div className="col-span-12 grid grid-cols-5 gap-3">
        {[
          { label: "实时车流量", value: "3,842", unit: "辆/h", trend: "up" as const },
          { label: "平均车速", value: "38.5", unit: "km/h", color: "hsl(150,80%,45%)" },
          { label: "拥堵指数", value: "1.35", color: "hsl(35,100%,55%)" },
          { label: "平均延误", value: "42", unit: "秒", trend: "down" as const, color: "hsl(0,80%,55%)" },
          { label: "路口饱和度", value: "72", unit: "%", color: "hsl(260,80%,60%)" },
        ].map(s => (
          <SciFiCard key={s.label}><StatValue {...s} /></SciFiCard>
        ))}
      </div>

      {/* Left */}
      <div className="col-span-4 flex flex-col gap-3">
        <SciFiCard title="交通运行指标雷达" elevated>
          <MiniRadar data={radarData} keys={["value"]} height={200} />
        </SciFiCard>

        <SciFiCard title="拥堵等级分布" accent="warning">
          <div className="space-y-3">
            {congestionData.map((d, i) => {
              const colors = ["hsl(150,80%,45%)", "hsl(190,100%,50%)", "hsl(35,100%,55%)", "hsl(0,80%,55%)"];
              return (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{d.name}</span>
                    <span style={{ color: colors[i] }}>{d.value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="h-full rounded-full transition-all" style={{ width: `${d.value}%`, background: colors[i], boxShadow: `0 0 10px ${colors[i]}` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SciFiCard>
      </div>

      {/* Center */}
      <div className="col-span-5 flex flex-col gap-3">
        <SciFiCard title="交通流量热力图（按小时/天）" elevated>
          <div className="space-y-1">
            <div className="flex gap-1 mb-1">
              <div className="w-8" />
              {[0, 4, 8, 12, 16, 20].map(h => (
                <span key={h} className="text-xs text-muted-foreground flex-1 text-center">{h}:00</span>
              ))}
            </div>
            {heatmapData.map((row, ri) => (
              <div key={ri} className="flex gap-[2px] items-center">
                <span className="text-xs text-muted-foreground w-8">{dayLabels[ri]}</span>
                {row.map((val, ci) => (
                  <div key={ci} className="flex-1 h-5 rounded-sm" style={{
                    background: `hsl(${190 - val * 190}, ${60 + val * 40}%, ${20 + val * 30}%)`,
                    opacity: 0.3 + val * 0.7
                  }} />
                ))}
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="实时车流量监测" accent="primary">
          <MiniLine data={realtimeFlow} lines={["main", "side"]} height={160} />
        </SciFiCard>
      </div>

      {/* Right */}
      <div className="col-span-3 flex flex-col gap-3">
        <SciFiCard title="重点路段排行" accent="danger">
          <div className="space-y-2">
            {topRoads.map((road, i) => (
              <div key={road.name} className="p-2 rounded-md bg-secondary/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-xs w-5 text-center" style={{ color: i < 3 ? "hsl(35,100%,55%)" : "hsl(210,20%,50%)" }}>
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium text-foreground">{road.name}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground pl-7">
                  <span>{road.flow}辆/h</span>
                  <span>{road.speed}km/h</span>
                  <span>延误{road.delay}s</span>
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="交通事件" accent="danger">
          <div className="space-y-2 text-xs">
            {[
              { time: "14:25", type: "事故", loc: "人民路东段", status: "处理中" },
              { time: "13:50", type: "施工", loc: "建设路中段", status: "已围挡" },
              { time: "13:10", type: "拥堵", loc: "中山路西段", status: "已疏导" },
              { time: "12:30", type: "事故", loc: "长江路北段", status: "已处理" },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-secondary/30">
                <span className="text-primary">{e.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${e.type === "事故" ? "bg-glow-danger/20 text-glow-danger" : e.type === "施工" ? "bg-glow-warning/20 text-glow-warning" : "bg-primary/20 text-primary"}`}>{e.type}</span>
                <span className="text-muted-foreground flex-1">{e.loc}</span>
                <span className="text-muted-foreground">{e.status}</span>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
};

export default TrafficMonitor;
