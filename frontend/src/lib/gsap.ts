/**
 * GSAP singleton — registers ScrollTrigger on the client only.
 * Always import gsap & ScrollTrigger from here, never from "gsap" directly,
 * to ensure the plugin registration order.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
