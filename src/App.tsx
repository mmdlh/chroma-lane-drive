import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/pages/Overview";
import SignalControl from "@/pages/SignalControl";
import TrafficMonitor from "@/pages/TrafficMonitor";
import DeviceManagement from "@/pages/DeviceManagement";
import DataAnalysis from "@/pages/DataAnalysis";
import AlertCenter from "@/pages/AlertCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/signal-control" element={<SignalControl />} />
            <Route path="/traffic-monitor" element={<TrafficMonitor />} />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/data-analysis" element={<DataAnalysis />} />
            <Route path="/alert-center" element={<AlertCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
