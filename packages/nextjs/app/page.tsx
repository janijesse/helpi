"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import ProjectCard from "./ProjectCard";

// Mock data for demonstration
const mockProjects = [
  {
    id: 0,
    name: "Clean Ocean Initiative",
    owner: "0x123...",
    requestedAmount: 5000,
    raisedAmount: 2500,
    currency: "USDC",
    approved: true,
    completed: false,
  },
  {
    id: 1,
    name: "Community Garden",
    owner: "0x456...",
    requestedAmount: 2000,
    raisedAmount: 1800,
    currency: "USDC",
    approved: true,
    completed: false,
  },
  {
    id: 2,
    name: "Literacy Program",
    owner: "0x789...",
    requestedAmount: 3000,
    raisedAmount: 3000,
    currency: "USDC",
    approved: true,
    completed: true,
  },
];

const Home = () => {
  const { address: connectedAddress } = useAccount();
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    // Fetch projects from smart contract if needed
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow pt-10 px-5">
      <h1 className="text-center">
        <span className="block text-2xl mb-2">Welcome to</span>
        <span className="block text-4xl font-bold">Helpi</span>
      </h1>
      <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row my-4">
        <p className="font-medium">Connected Address:</p>
        <Address address={connectedAddress} />
      </div>

      <div className="flex-grow bg-base-300 w-full mt-8 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
      
        <div className="w-full max-w-6xl mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        </div>
      </div>

     
      </div>
    </div>
  );
};

export default Home;
