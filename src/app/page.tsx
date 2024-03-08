"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
export default function Home() {
  const hoverItems: {
    title: string;
    description: string;
    link: string;
  }[] = [
    {
      title: "AI Blog Wizard",
      description:
        "Unleash the power of AI to effortlessly generate captivating blog posts on any topic imaginable, saving you time and boosting your online presence like never before!",
      link: "/ai-autoblog",
    },
    {
      title: "Truth Tracker",
      description:
        "Harness advanced algorithms to fact-check information with precision, ensuring your content is always reliable and trustworthy, empowering you to build credibility effortlessly.",
      link: "/fact-check",
    },
    {
      title: "Present Perfect",
      description:
        "Craft visually stunning presentations with ease using our AI-powered tools, captivating your audience and leaving a lasting impression with every slide.",
      link: "/presentations",
    },
    {
      title: "Util Gen",
      description:
        "Explore all the necessary utilities you need effortlessly with our AI-powered tools, saving you time and enhancing your online presence.",
      link: "/util-gen",
    },
    {
      title: "AI Chat Genie",
      description:
        "Deliver unparalleled customer engagement with AI-driven chatbots, providing instant support and personalized interactions to enhance customer satisfaction and loyalty.",
      link: "/chat",
    },
  ];
  return (
    <main className="flex h-[300vh] overflow-clip flex-col items-center justify-between">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          MarpShot
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-4xl"
        >
          Fulfilling all your content needs
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <a href="#explore">
            <Button className="flex gap-2">
              Explore More <ArrowDown />
            </Button>
          </a>
        </motion.div>
      </LampContainer>
      <div
        id="explore"
        className="relative flex flex-col justify-center items-center h-screen mx-24"
      >
        <Boxes />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <h1 className="text-4xl font-bold z-50 shadow-sm">What we Offer?</h1>
          <HoverEffect items={hoverItems}></HoverEffect>
        </motion.div>
      </div>

      <div className="relative flex flex-col justify-center items-center h-screen z-50 bg-foreground w-full">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-white md:text-4xl"
        >
          Your Content Companion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="py-4 bg-clip-text text-center w-[65ch] tracking-tight text-white text-xl"
        >
          Marpshot is your ultimate solution for all content needs, offering a
          comprehensive suite of tools designed to streamline the content
          creation process. Whether you&apos;re looking to create stunning
          visuals, engaging presentations, or captivating videos, Marpshot has
          got you covered. With its intuitive interface and powerful features,
          Marpshot enables creators to bring their ideas to life with ease and
          efficiency. Say goodbye to juggling multiple platforms and embrace the
          simplicity of having all your content needs met in one place. Marpshot
          is not just a tool; it&apos;s your content creation partner,
          empowering you to unleash your creativity and achieve your content
          goals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <a href="#explore">
            <Button className="flex gap-2 sticky z-[9999999]">
              Dive Into MarpShop <ArrowUp />
            </Button>
          </a>
        </motion.div>
        <BackgroundBeams />
      </div>
    </main>
  );
}
