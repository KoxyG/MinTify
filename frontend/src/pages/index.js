import Hero from "./Components/hero";
import Features from "./Components/features";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <div
      className=""
    >
      
      <div >
        <Hero />
        <Features />

      </div>
      
    </div>
  );
}
