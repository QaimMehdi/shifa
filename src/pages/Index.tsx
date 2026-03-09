import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import ImpactSection from "@/components/ImpactSection";
import ToolsSection from "@/components/ToolsSection";
import TabletSection from "@/components/TabletSection";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const goToChat = () => navigate("/chat");

  return (
    <div className="min-h-screen bg-background">
      <Navbar onTryNow={goToChat} />
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection onTryNow={goToChat} />
      <ImpactSection />
      <ToolsSection onTryNow={goToChat} />
      <TabletSection />
      <Footer />
    </div>
  );
};

export default Index;
