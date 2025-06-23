import Image from "next/image";
import Orange_progress from "./components/Orange_progress.js";
import ToDo from "./components/todo.js";
import Card from "./components/card.js";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <div className="flex gap-4">
        <ToDo />
        <Orange_progress />
        <Card />
      </div>
    </main>
  );
}
