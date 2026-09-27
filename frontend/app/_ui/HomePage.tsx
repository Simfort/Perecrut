import {
  Features,
  Header,
  HomeHero,
  HowInterviewly,
  HowItWorks,
} from "@/widgets";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <HomeHero />
        <Features />
        <HowItWorks />
        <HowInterviewly />
      </main>
    </div>
  );
};
