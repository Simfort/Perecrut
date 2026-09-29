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
      <main>
        <HomeHero />
        <Features />
        <HowItWorks />
        <HowInterviewly />
      </main>
    </div>
  );
};
