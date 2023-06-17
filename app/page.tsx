"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  async function fetchIpData(e?: React.SyntheticEvent) {
    e?.preventDefault();
    setLoading(true);
    const url = input
      ? `https://ipapi.co/${input}/json`
      : "https://ipapi.co/json";
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      setInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIpData().then(() => {
      setPageReady(true);
    });
  }, []);

  if (!pageReady)
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={64} />
      </div>
    );

  return (
    <main className="flex flex-col w-screen mx-auto mt-6 items-center justify-center gap-10 mb-10">
      <div className="flex flex-col text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find your IP details online
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          Track your ip address, ip loaction, isp details and much more...
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mx-10 items-start">
        <form
          className="flex w-full mx-auto max-w-md flex-row gap-2 items-end"
          onSubmit={fetchIpData}
        >
          <div className="w-full flex flex-col gap-2">
            <Label>IP Address</Label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter IP Address"
            />
          </div>
          <Button disabled={loading}>
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Search
          </Button>
        </form>
        {data && (
          <pre className="overflow-x-scroll mx-6">
            {JSON.stringify(data, undefined, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
