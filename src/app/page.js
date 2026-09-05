import HeroSection from "@/components/Home/HerSection";
import CategorySection from "@/components/Home/CategorySection";
import NewArrivals from "@/components/Home/NewArrivals";
import EditorialCollection from "@/components/Home/EditorialCollection";
import BestSellers from "../components/Home/BestSellers";
import PromotionalSection from "@/components/Home/PromotionalCollection";
import ShopBenefits from "@/components/Home/ShopBenefits";
import TrendingSection from "@/components/Home/trendingSection";
import Reviews from "@/components/Home/Reviews";
import Newsletter from "@/components/Home/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection/>
      <NewArrivals/>
      <EditorialCollection/>
      <BestSellers/>
      <PromotionalSection/>
      <ShopBenefits/>
      <TrendingSection/>
      <Reviews/>
      <Newsletter/>
    </main>
  );
}