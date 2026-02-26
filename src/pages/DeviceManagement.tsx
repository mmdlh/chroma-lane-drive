import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import ProgressRing from "@/components/ProgressRing";
import { MiniBar, MiniArea } from "@/components/MiniChart";

const devices = [
  { id: "SL-A001", name: "信号灯-A001", location: "人民路/建设路", type: "LED信号灯", status: "在线", uptime: 99.2, lastCheck: "2024-01-15" },
  { id: "SL-A002", name: "信号灯-A002", location: "人民路/建设路", type: "LED信号灯", status: "在线", uptime: 98.5, lastCheck: "2024-01-14" },
  { id: "SL-B001", name: "信号灯-B001", location: "中山路/解放路", type: "智能信号灯", status: "故障", uptime: 85.3, lastCheck: "2024-01-12" },
  { id: "SL-B002", name: "信号灯-B002", location: "中山路/解放路", type: "智能信号灯", status: "在线", uptime: 97.8, lastCheck: "2024-01-15" },
  { id: "SL-C001", name: "信号灯-C001", location: "长江路/黄河路", type: "LED信号灯", status: "维护", uptime: 92.1, lastCheck: "2024-01-10" },
  { id: "SL-C002", name: "信号灯-C002", location: "长江路/黄河路", type: "感应信号灯", status: "在线", uptime: 96.4, lastCheck: "2024-01-15" },
  { id: "SL-D001", name: "信号灯-D001", location: "和平路/胜利路", type: "LED信号灯", status: "离线", uptime: 78.5, lastCheck: "2024-01-08" },
  { id: "SL-D002", name: "信号灯-D002", location: "和平路/胜利路", type: "智能信号灯", status: "在线", uptime: 99.0, lastCheck: "2024-01-15" },
];

const faultTrend = Array.from({ length: 12 }, (_, i) => ({ name: `${i + 1}月`, value: Math.floor(Math.random() * 20 + 5) }));
const typeDistribution = [
  { name: "LED信号灯", value: 180 }, { name: "智能信号灯", value: 120 }, { name: "感应信号灯", value: 60 }, { name: "其他", value: 33 }
];

const DeviceManagement = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Top summary */}
      <div className="col-span-8 grid grid-cols-4 gap-3">
        {[
          { label: "设备总数", value: "393", unit: "台", color: "hsl(190,100%,50%)" },
          { label: "在线率", value: "87.0", unit: "%", color: "hsl(150,80%,45%)" },
          { label: "故障数", value: "28", unit: "台", color: "hsl(0,80%,55%)" },
          { label: "待维护", value: "15", unit: "台", color: "hsl(35,100%,55%)" },
        ].map(s => (
          <SciFiCard key={s.label}><StatValue {...s} /></SciFiCard>
        ))}
      </div>

      <div className="col-span-4">
        <SciFiCard title="设备类型分布">
          <div className="grid grid-cols-2 gap-2">
            {typeDistribution.map((t, i) => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: ["hsl(190,100%,50%)", "hsl(150,80%,45%)", "hsl(260,80%,60%)", "hsl(35,100%,55%)"][i] }} />
                <span className="text-muted-foreground">{t.name}</span>
                <span className="ml-auto sci-glow-text">{t.value}</span>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>

      {/* Device table */}
      <div className="col-span-8">
        <SciFiCard title="设备列表" elevated>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  {["编号", "名称", "位置", "类型", "状态", "在线率", "最近巡检"].map(h => (
                    <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <td className="py-2 px-2 font-display text-primary text-xs">{d.id}</td>
                    <td className="py-2 px-2 text-foreground">{d.name}</td>
                    <td className="py-2 px-2 text-muted-foreground">{d.location}</td>
                    <td className="py-2 px-2 text-muted-foreground">{d.type}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        d.status === "在线" ? "bg-glow-success/20 text-glow-success" :
                        d.status === "故障" ? "bg-glow-danger/20 text-glow-danger" :
                        d.status === "维护" ? "bg-glow-warning/20 text-glow-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>{d.status}</span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="progress-bar flex-1 h-1.5">
                          <div className="h-full rounded-full" style={{ 
                            width: `${d.uptime}%`, 
                            background: d.uptime > 95 ? "hsl(150,80%,45%)" : d.uptime > 85 ? "hsl(35,100%,55%)" : "hsl(0,80%,55%)" 
                          }} />
                        </div>
                        <span className="text-muted-foreground w-12 text-right">{d.uptime}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground">{d.lastCheck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SciFiCard>
      </div>

      {/* Right sidebar */}
      <div className="col-span-4 flex flex-col gap-3">
        <SciFiCard title="区域设备健康度" accent="success">
          <div className="grid grid-cols-2 gap-4">
            {[
              { area: "东区", value: 95, color: "hsl(150,80%,45%)" },
              { area: "西区", value: 88, color: "hsl(190,100%,50%)" },
              { area: "南区", value: 92, color: "hsl(260,80%,60%)" },
              { area: "北区", value: 76, color: "hsl(35,100%,55%)" },
            ].map(a => (
              <div key={a.area} className="relative flex flex-col items-center">
                <ProgressRing value={a.value} size={65} label={a.area} color={a.color} />
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="月度故障趋势" accent="danger">
          <MiniBar data={faultTrend} height={140} color="hsl(0,80%,55%)" />
        </SciFiCard>

        <SciFiCard title="维护计划" accent="warning">
          <div className="space-y-2 text-xs">
            {[
              { date: "01-20", task: "东区A组巡检", status: "待执行" },
              { date: "01-22", task: "西区B组更换灯头", status: "已安排" },
              { date: "01-25", task: "南区C组线路检修", status: "待确认" },
              { date: "01-28", task: "北区D组系统升级", status: "待执行" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-secondary/30">
                <span className="text-primary whitespace-nowrap">{m.date}</span>
                <span className="text-foreground flex-1">{m.task}</span>
                <span className="text-glow-warning">{m.status}</span>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
};

export default DeviceManagement;
