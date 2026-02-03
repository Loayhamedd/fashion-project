import HeroSection from "../../components/home/HeroSection";
import NewCollection from "../../components/home/NewCollection";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import GallerySection from "../../components/home/GallerySection";
import ContactUs from "../../components/home/CountactUs";

const Home = () => {
  return (
    <div className="min-h-screen" dir="ltr">
      <HeroSection />
      <NewCollection />
      <WhyChooseUs />
      <GallerySection />
      <ContactUs />
    </div>
  );
};

export default Home;
