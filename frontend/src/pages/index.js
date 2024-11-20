import Hero from "../Components/hero";
import Features from "../Components/features";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HowTo from "../Components/howto";

export default function Home() {
  return (
    <div className="">
      <ToastContainer />
      <div>
        <section id="hero">
          <Hero />
          <HowTo />
        </section>
        <section id="features">
          <Features />
        </section>
      </div>
    </div>
  );
}
