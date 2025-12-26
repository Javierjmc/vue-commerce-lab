import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Target, Users, ChevronDown } from "lucide-react";

import Layout from "@/layouts/Layout";
import LocationMap from "@/components/LocationMap";
import HeroSection from "@/components/HeroSection";
import { GlassTabs } from "@/components/GlassTabs";

const Nosotras = () => {  


  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <Layout>
      <HeroSection />    
      <GlassTabs />
    </Layout>
  );
};

export default Nosotras;
