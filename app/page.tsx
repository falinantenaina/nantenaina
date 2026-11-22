import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Conviction } from "@/components/conviction";
import { Contact } from "@/components/contact";
import { Expertises } from "@/components/expertises";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Conviction />
      <Expertises />
      <Projects />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
