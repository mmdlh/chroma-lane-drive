import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "系统总览" },
  { path: "/signal-control", label: "信号控制" },
  { path: "/traffic-monitor", label: "交通监测" },
  { path: "/device-management", label: "设备管理" },
  { path: "/data-analysis", label: "数据分析" },
  { path: "/alert-center", label: "告警中心" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const now = new Date();
  const timeStr = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-background grid-bg flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-between px-6 py-3 border-b border-border/50" 
        style={{ background: 'linear-gradient(180deg, hsl(220 25% 10%), hsl(220 25% 6%))' }}>
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" 
          style={{ background: 'linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.6), transparent)' }} />
        
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <h1 className="sci-title text-xl md:text-2xl font-bold">智能信号灯管控平台</h1>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={`nav-item ${location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path)) ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="text-xs text-muted-foreground font-body hidden lg:block">{timeStr}</div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
