import Image from "next/image";
import Orange_progress from "./components/Orange_progress.js";
import ToDo from "./components/todo.js";
import GreenDone from "./components/green_done.js";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <div className="flex gap-4">
        <ToDo />
        <Orange_progress />
        <GreenDone />
      </div>
    </main>
  );
}
