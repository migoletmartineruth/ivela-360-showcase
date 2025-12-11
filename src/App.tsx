import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import EnterpriseWIGs from "@/pages/objectives/EnterpriseWIGs";
import DivisionWIGs from "@/pages/objectives/DivisionWIGs";
import TeamOKR from "@/pages/objectives/TeamOKR";
import IndividualGoals from "@/pages/objectives/IndividualGoals";
import MidYearEvaluation from "@/pages/evaluations/MidYearEvaluation";
import ManagerReview from "@/pages/evaluations/ManagerReview";
import Calibration from "@/pages/Calibration";
import NineBox from "@/pages/NineBox";
import SpecialCases from "@/pages/SpecialCases";
import SharePointLists from "@/pages/sharepoint/SharePointLists";
import PowerAutomate from "@/pages/sharepoint/PowerAutomate";
import PowerBI from "@/pages/PowerBI";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/objectives/enterprise-wigs" element={<EnterpriseWIGs />} />
            <Route path="/objectives/division-wigs" element={<DivisionWIGs />} />
            <Route path="/objectives/team-okr" element={<TeamOKR />} />
            <Route path="/objectives/individual" element={<IndividualGoals />} />
            <Route path="/evaluations/mid-year" element={<MidYearEvaluation />} />
            <Route path="/evaluations/end-year" element={<MidYearEvaluation />} />
            <Route path="/evaluations/manager-review" element={<ManagerReview />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/nine-box" element={<NineBox />} />
            <Route path="/special-cases" element={<SpecialCases />} />
            <Route path="/sharepoint/lists" element={<SharePointLists />} />
            <Route path="/sharepoint/forms" element={<SharePointLists />} />
            <Route path="/sharepoint/flows" element={<PowerAutomate />} />
            <Route path="/powerbi" element={<PowerBI />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
