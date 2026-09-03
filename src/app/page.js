import HeroSection from "@/components/Home/HerSection";
import CategorySection from "@/components/Home/CategorySection";
import NewArrivals from "@/components/Home/NewArrivals";
import EditorialCollection from "@/components/Home/EditorialCollection";
import BestSellers from "../components/Home/BestSellers";
import PromotionalSection from "@/components/Home/PromotionalCollection";
import ShopBenefits from "@/components/Home/ShopBenefits";
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
      <Newsletter/>
    </main>
  );
}