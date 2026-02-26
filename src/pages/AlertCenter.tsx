import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import { MiniBar, MiniLine, MiniPie } from "@/components/MiniChart";

const alerts = [
  { id: 1, time: "14:32:15", device: "SL-A103", type: "设备故障", location: "人民路/建设路", level: "紧急", desc: "信号灯主板通信中断", status: "未处理" },
  { id: 2, time: "14:28:40", device: "SL-B207", type: "通信超时", location: "中山路/解放路", level: "重要", desc: "设备响应超时>30秒", status: "处理中" },
  { id: 3, time: "14:15:22", device: "SL-C054", type: "设备离线", location: "长江路/黄河路", level: "一般", desc: "设备离线超过15分钟", status: "已通知" },
  { id: 4, time: "13:50:08", device: "SL-D112", type: "相位冲突", location: "和平路/胜利路", level: "紧急", desc: "检测到东西/南北相位冲突", status: "未处理" },
  { id: 5, time: "13:45:30", device: "SL-A205", type: "灯珠故障", location: "文化路/科技路", level: "一般", desc: "红灯R相灯珠亮度降低40%", status: "已安排" },
  { id: 6, time: "13:20:15", device: "SL-B108", type: "电压异常", location: "湖滨路/公园路", level: "重要", desc: "输入电压偏低至180V", status: "处理中" },
  { id: 7, time: "12:55:42", device: "SL-C032", type: "通信超时", location: "建设路/解放路", level: "一般", desc: "间歇性通信中断", status: "已处理" },
  { id: 8, time: "12:30:18", device: "SL-D045", type: "设备故障", location: "和平路/文化路", level: "重要", desc: "感应线圈检测异常", status: "已处理" },
];

const alertTrend = Array.from({ length: 7 }, (_, i) => ({
  name: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][i],
  紧急: Math.floor(Math.random() * 5 + 2),
  重要: Math.floor(Math.random() * 10 + 5),
  一般: Math.floor(Math.random() * 15 + 8),
}));

const typePie = [
  { name: "设备故障", value: 35 }, { name: "通信超时", value: 25 }, { name: "相位冲突", value: 15 },
  { name: "电压异常", value: 12 }, { name: "灯珠故障", value: 8 }, { name: "其他", value: 5 }
];

const levelColors: Record<string, string> = {
  "紧急": "bg-glow-danger/20 text-glow-danger",
  "重要": "bg-glow-warning/20 text-glow-warning",
  "一般": "bg-primary/20 text-primary",
};

const statusColors: Record<string, string> = {
  "未处理": "text-glow-danger",
  "处理中": "text-glow-warning",
  "已通知": "text-primary",
  "已安排": "text-glow-success",
  "已处理": "text-muted-foreground",
};

const AlertCenter = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Top stats */}
      <div className="col-span-12 grid grid-cols-4 gap-3">
        {[
          { label: "今日告警总数", value: "47", unit: "条", color: "hsl(190,100%,50%)" },
          { label: "紧急告警", value: "8", unit: "条", color: "hsl(0,80%,55%)" },
          { label: "待处理", value: "12", unit: "条", color: "hsl(35,100%,55%)" },
          { label: "平均响应时间", value: "4.2", unit: "分钟", color: "hsl(150,80%,45%)" },
        ].map(s => (
          <SciFiCard key={s.label}><StatValue {...s} /></SciFiCard>
        ))}
      </div>

      {/* Alert table */}
      <div className="col-span-8">
        <SciFiCard title="告警列表" elevated>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  {["时间", "设备编号", "告警类型", "位置", "等级", "描述", "状态"].map(h => (
                    <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alerts.map(a => (
                  <tr key={a.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <td className="py-2 px-2 text-primary whitespace-nowrap">{a.time}</td>
                    <td className="py-2 px-2 font-display text-xs text-foreground">{a.device}</td>
                    <td className="py-2 px-2 text-foreground">{a.type}</td>
                    <td className="py-2 px-2 text-muted-foreground">{a.location}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${levelColors[a.level]}`}>{a.level}</span>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground max-w-[200px] truncate">{a.desc}</td>
                    <td className={`py-2 px-2 text-xs ${statusColors[a.status]}`}>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SciFiCard>
      </div>

      {/* Right */}
      <div className="col-span-4 flex flex-col gap-3">
        <SciFiCard title="告警类型分布" accent="danger">
          <MiniPie data={typePie} height={140} />
          <div className="grid grid-cols-2 gap-1 mt-2">
            {typePie.map((t, i) => (
              <div key={t.name} className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: ["hsl(190,100%,50%)", "hsl(150,80%,45%)", "hsl(35,100%,55%)", "hsl(260,80%,60%)", "hsl(0,80%,55%)", "hsl(210,80%,60%)"][i] }} />
                <span className="text-muted-foreground">{t.name} {t.value}%</span>
              </div>
            ))}
          </div>
        </SciFiCard>

        <SciFiCard title="本周告警趋势" accent="warning">
          <MiniLine data={alertTrend} lines={["紧急", "重要", "一般"]} height={160} />
        </SciFiCard>

        <SciFiCard title="处理效率" accent="success">
          <div className="space-y-3">
            {[
              { label: "30分钟内处理", value: 65 },
              { label: "1小时内处理", value: 85 },
              { label: "当日处理率", value: 95 },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="sci-glow-text">{item.value}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
};

export default AlertCenter;
