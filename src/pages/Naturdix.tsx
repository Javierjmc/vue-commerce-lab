import Header from "@/components/naturdix/Header";
import Hero from "@/components/naturdix/Hero";
import FeaturedProducts from "@/components/naturdix/FeaturedProducts";
import SubscriptionBanner from "@/components/naturdix/SubscriptionBanner";
import FreeShipping from "@/components/naturdix/FreeShipping";
import FooterNaturdix from "@/components/naturdix/FooterNaturdix";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <SubscriptionBanner />
        <FreeShipping />
      </main>
      <FooterNaturdix />
    </div>
  );
};

export default Index;
