import SciFiCard from "@/components/SciFiCard";
import StatValue from "@/components/StatValue";
import { MiniArea, MiniBar, MiniLine, MiniPie, MiniRadar } from "@/components/MiniChart";

const monthlyFlow = Array.from({ length: 12 }, (_, i) => ({
  name: `${i + 1}月`, 车流量: Math.floor(Math.random() * 5000 + 8000), 同比: Math.floor(Math.random() * 4000 + 7000)
}));

const hourlyPattern = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`, 工作日: Math.floor(Math.sin(i / 3.8 - 2) * 400 + 500), 周末: Math.floor(Math.sin(i / 3.8 - 3) * 250 + 350)
}));

const speedDist = [
  { name: "0-20", value: 8 }, { name: "20-40", value: 35 }, { name: "40-60", value: 40 }, { name: "60-80", value: 15 }, { name: "80+", value: 2 }
];

const intersectionPerf = [
  { name: "通行能力", A: 85, B: 72 }, { name: "延误", A: 30, B: 55 }, { name: "排队", A: 40, B: 65 },
  { name: "绿灯利用", A: 90, B: 70 }, { name: "协调性", A: 78, B: 60 }, { name: "安全指数", A: 92, B: 80 }
];

const pieCategories = [
  { name: "小型车", value: 62 }, { name: "中型车", value: 18 }, { name: "大型车", value: 12 }, { name: "特种车", value: 8 }
];

const DataAnalysis = () => {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* Stats */}
      <div className="col-span-12 grid grid-cols-6 gap-3">
        {[
          { label: "日均车流", value: "42,580", unit: "辆" },
          { label: "高峰流量", value: "6,230", unit: "辆/h", color: "hsl(0,80%,55%)" },
          { label: "平均车速", value: "38.2", unit: "km/h", color: "hsl(150,80%,45%)" },
          { label: "通行效率", value: "82.5", unit: "%", color: "hsl(190,100%,50%)" },
          { label: "能耗节约", value: "15.3", unit: "%", trend: "up" as const, color: "hsl(150,80%,45%)" },
          { label: "碳减排", value: "2.8", unit: "吨/日", color: "hsl(260,80%,60%)" },
        ].map(s => (
          <SciFiCard key={s.label}><StatValue {...s} /></SciFiCard>
        ))}
      </div>

      {/* Row 1 */}
      <div className="col-span-5">
        <SciFiCard title="月度交通流量对比" elevated>
          <MiniLine data={monthlyFlow} lines={["车流量", "同比"]} height={200} />
        </SciFiCard>
      </div>
      <div className="col-span-4">
        <SciFiCard title="24小时流量模式" accent="warning">
          <MiniArea data={hourlyPattern} dataKey="工作日" height={200} color="hsl(190,100%,50%)" />
        </SciFiCard>
      </div>
      <div className="col-span-3">
        <SciFiCard title="车辆类型占比" accent="success">
          <MiniPie data={pieCategories} height={130} />
          <div className="grid grid-cols-2 gap-1 mt-2">
            {pieCategories.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: ["hsl(190,100%,50%)", "hsl(150,80%,45%)", "hsl(35,100%,55%)", "hsl(260,80%,60%)"][i] }} />
                <span className="text-muted-foreground">{c.name} {c.value}%</span>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>

      {/* Row 2 */}
      <div className="col-span-4">
        <SciFiCard title="路口性能对比（A vs B方案）" accent="primary">
          <MiniRadar data={intersectionPerf} keys={["A", "B"]} height={200} />
        </SciFiCard>
      </div>
      <div className="col-span-4">
        <SciFiCard title="车速分布" accent="success">
          <MiniBar data={speedDist} dataKey="value" height={180} color="hsl(150,80%,45%)" />
          <div className="text-xs text-muted-foreground text-center mt-1">速度区间 (km/h)</div>
        </SciFiCard>
      </div>
      <div className="col-span-4">
        <SciFiCard title="分析报告" accent="warning">
          <div className="space-y-2 text-xs">
            {[
              { title: "高峰时段优化建议", desc: "建议人民路/建设路早高峰延长东西直行绿灯10秒", type: "优化" },
              { title: "异常流量预警", desc: "长江路周三下午流量异常增加35%，建议关注", type: "预警" },
              { title: "绿波协调报告", desc: "中山路绿波带通过率提升至82%，效果良好", type: "报告" },
              { title: "能耗分析", desc: "LED灯具升级后，月均节能18.5%", type: "分析" },
              { title: "安全评估", desc: "事故多发路口已优化全红时间，事故率下降25%", type: "评估" },
            ].map((r, i) => (
              <div key={i} className="p-2 rounded bg-secondary/30 sci-border-glow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-foreground font-medium">{r.title}</span>
                  <span className="text-primary text-xs px-1.5 py-0.5 rounded bg-primary/10">{r.type}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
};

export default DataAnalysis;
