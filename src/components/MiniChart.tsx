import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const COLORS = [
  "hsl(190, 100%, 50%)",
  "hsl(150, 80%, 45%)",
  "hsl(35, 100%, 55%)",
  "hsl(260, 80%, 60%)",
  "hsl(0, 80%, 55%)",
  "hsl(210, 80%, 60%)",
];

const tooltipStyle = {
  contentStyle: { background: "hsl(215, 30%, 12%)", border: "1px solid hsl(190, 100%, 50%, 0.3)", borderRadius: 8, fontSize: 12 },
  labelStyle: { color: "hsl(190, 100%, 70%)" },
};

export const MiniArea = ({ data, dataKey = "value", color = COLORS[0], height = 100 }: any) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip {...tooltipStyle} />
      <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
);

export const MiniBar = ({ data, dataKey = "value", color = COLORS[0], height = 100 }: any) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data}>
      <XAxis dataKey="name" tick={{ fill: "hsl(210,20%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
      <Tooltip {...tooltipStyle} />
      <Bar dataKey={dataKey} fill={color} radius={[3, 3, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const MiniPie = ({ data, height = 120 }: any) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie data={data} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value" stroke="none">
        {data.map((_: any, i: number) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip {...tooltipStyle} />
    </PieChart>
  </ResponsiveContainer>
);

export const MiniLine = ({ data, lines, height = 100 }: any) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <XAxis dataKey="name" tick={{ fill: "hsl(210,20%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "hsl(210,20%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
      <Tooltip {...tooltipStyle} />
      {lines.map((l: any, i: number) => (
        <Line key={l} type="monotone" dataKey={l} stroke={COLORS[i]} strokeWidth={2} dot={false} />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export const MiniRadar = ({ data, keys, height = 150 }: any) => (
  <ResponsiveContainer width="100%" height={height}>
    <RadarChart data={data}>
      <PolarGrid stroke="hsl(190,100%,50%,0.15)" />
      <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(210,20%,60%)", fontSize: 10 }} />
      {keys.map((k: string, i: number) => (
        <Radar key={k} dataKey={k} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} />
      ))}
    </RadarChart>
  </ResponsiveContainer>
);

export { COLORS };
