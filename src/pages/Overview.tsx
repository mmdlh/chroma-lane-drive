import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import ProgressRing from "@/components/ProgressRing";
import { MiniArea, MiniBar, MiniPie, MiniLine } from "@/components/MiniChart";

const trafficData = Array.from({ length: 24 }, (_, i) => ({ name: `${i}:00`, value: Math.floor(Math.random() * 800 + 200), flow: Math.floor(Math.random() * 500 + 100) }));
const weekData = [{ name: "周一", value: 4200 }, { name: "周二", value: 3800 }, { name: "周三", value: 5100 }, { name: "周四", value: 4600 }, { name: "周五", value: 6200 }, { name: "周六", value: 3200 }, { name: "周日", value: 2800 }];
const pieData = [{ name: "正常运行", value: 342 }, { name: "故障", value: 28 }, { name: "维护中", value: 15 }, { name: "离线", value: 8 }];
const alertData = [
  { id: 1, type: "故障", device: "信号灯-A103", location: "人民路/建设路", time: "14:32", level: "高" },
  { id: 2, type: "超时", device: "信号灯-B207", location: "中山路/解放路", time: "14:28", level: "中" },
  { id: 3, type: "离线", device: "信号灯-C054", location: "长江路/黄河路", time: "14:15", level: "低" },
  { id: 4, type: "故障", device: "信号灯-D112", location: "和平路/胜利路", time: "13:50", level: "高" },
];

const Overview = () => {
  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      {/* Top stats row */}
      <div className="col-span-12 grid grid-cols-6 gap-3">
        {[
          { label: "信号灯总数", value: "393", unit: "台", color: "hsl(190,100%,50%)" },
          { label: "在线设备", value: "342", unit: "台", trend: "up" as const, color: "hsl(150,80%,45%)" },
          { label: "故障设备", value: "28", unit: "台", trend: "down" as const, color: "hsl(0,80%,55%)" },
          { label: "今日告警", value: "47", unit: "条", color: "hsl(35,100%,55%)" },
          { label: "路口总数", value: "156", unit: "个", color: "hsl(260,80%,60%)" },
          { label: "平均绿信比", value: "62", unit: "%", color: "hsl(150,80%,45%)" },
        ].map((s) => (
          <SciFiCard key={s.label} className="flex items-center justify-center">
            <StatValue {...s} />
          </SciFiCard>
        ))}
      </div>

      {/* Left column */}
      <div className="col-span-3 flex flex-col gap-3">
        <SciFiCard title="设备状态分布" accent="primary" className="flex-1">
          <MiniPie data={pieData} height={140} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: ["hsl(190,100%,50%)", "hsl(0,80%,55%)", "hsl(35,100%,55%)", "hsl(210,20%,50%)"][i] }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto sci-glow-text">{d.value}</span>
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="区域在线率" accent="success" className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {["东区", "西区", "南区", "北区"].map((area, i) => (
              <div key={area} className="relative flex flex-col items-center">
                <ProgressRing value={[92, 87, 95, 78][i]} size={70} label={area} color={["hsl(190,100%,50%)", "hsl(150,80%,45%)", "hsl(260,80%,60%)", "hsl(35,100%,55%)"][i]} />
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>

      {/* Center */}
      <div className="col-span-6 flex flex-col gap-3">
        <SciFiCard title="24小时交通流量趋势" elevated className="flex-1">
          <MiniLine data={trafficData} lines={["value", "flow"]} height={200} />
        </SciFiCard>

        <SciFiCard title="本周路口通行量" accent="warning" className="flex-1">
          <MiniBar data={weekData} height={160} color="hsl(190,100%,50%)" />
        </SciFiCard>
      </div>

      {/* Right column */}
      <div className="col-span-3 flex flex-col gap-3">
        <SciFiCard title="实时告警" accent="danger" className="flex-1">
          <div className="space-y-2">
            {alertData.map((a) => (
              <div key={a.id} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50 text-xs">
                <div className={`w-2 h-2 rounded-full animate-pulse-glow ${a.level === "高" ? "bg-glow-danger" : a.level === "中" ? "bg-glow-warning" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="sci-glow-text font-medium">{a.type}</span>
                    <span className="text-muted-foreground">{a.time}</span>
                  </div>
                  <div className="text-muted-foreground truncate">{a.device} · {a.location}</div>
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="系统运行状态" accent="success" className="flex-1">
          {[
            { label: "CPU使用率", value: 34 },
            { label: "内存使用率", value: 67 },
            { label: "网络带宽", value: 45 },
            { label: "存储使用", value: 72 },
          ].map((item) => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="sci-glow-text">{item.value}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </SciFiCard>
      </div>
    </div>
  );
};

export default Overview;
