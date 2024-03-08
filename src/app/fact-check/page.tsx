"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Lottie from "lottie-react";
import Animation from "../../../public/Animation.json";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import parse from "html-react-parser";

export default function FactCheck() {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [isGettingFactInput, setIsGettingFactInput] = useState(true);
  const [isClaimsLoading, setIsClaimsLoading] = useState(false);
  const [isSelectClaims, setIsSelectClaims] = useState(false);
  const [isCheckLoading, setIsCheckLoading] = useState(false);
  const [isFacts, setIsFacts] = useState(false);
  const [detectedClaims, setDetectedClaims] = useState([
    { content: "India is located in Europe" },
    { content: "India is situated in Europe" },
  ]);
  const [selectedClaimIndices, setSelectedClaimIndices] = useState<any>([]);
  const [claims, setClaims] = useState<any>([]);
  const [response, setResponse] = useState<any>();

  const checkClaims = () => {
    setIsGettingFactInput(false);
    setIsClaimsLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LONGSHOT_KEY}`,
      },
      body: JSON.stringify({
        blog: content,
      }),
    };

    let url = "https://api-v2.longshot.ai/custom/api/detect/claims";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetectedClaims(data.copies);
        setIsClaimsLoading(false);
        setIsSelectClaims(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error Detecting Claims",
        });
        setIsClaimsLoading(false);
      });
  };

  const pushClaim = (index: number) => {
    if (!selectedClaimIndices.includes(index)) {
      let newClaims = [...claims, detectedClaims[index].content];
      setClaims(newClaims);
      setSelectedClaimIndices([...selectedClaimIndices, index]);
    } else {
      let updatedClaims = claims.filter(
        (claim: any) => claim !== detectedClaims[index].content
      );
      setClaims(updatedClaims);
      setSelectedClaimIndices(
        selectedClaimIndices.filter((idx: number) => idx !== index)
      );
    }
  };

  const checkFacts = () => {
    setIsSelectClaims(false);
    setIsCheckLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LONGSHOT_KEY}`,
      },
      body: JSON.stringify({
        claims,
        headline,
        language: "en",
      }),
    };

    let url = "https://api-v2.longshot.ai/custom/api/v2/blog/fact/check";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data.fact_check_results);
        setIsCheckLoading(false);
        setIsFacts(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error Checking Facts",
        });
        setIsCheckLoading(false);
      });
  };

  return (
    <div className="h-screen p-24">
      <h1 className="text-4xl font-bold flex gap-2 items-center">
        Truth Tracker
      </h1>
      <p className="text-xl font-medium">
        Check Facts for your content with Longshot
      </p>
      {isGettingFactInput && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <div className="flex flex-col w-full items-start space-x-2 gap-2">
            <Label className="font-bold text-lg">Your Content Headline</Label>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter your content headline"
            />
            <Label className="font-bold text-lg">Your Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your content to check for facts"
              cols={10}
            />
            <Button
              type="submit"
              className="w-full"
              onClick={() => checkClaims()}
            >
              Detect Claims
            </Button>
          </div>
        </div>
      )}
      {isClaimsLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>Detecting claims on your content. This may take a while</p>
        </div>
      )}
      {isSelectClaims && (
        <div>
          <div className="max-w-3xl relative mx-auto my-4">
            <div className="flex items-center gap-32">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsSelectClaims(false);
                  setIsGettingFactInput(true);
                }}
              >
                <ArrowLeft /> Back
              </Button>
              <p className="text-center">
                Select the claims below to check for facts
              </p>
            </div>
            <div className="border-sky-100 border rounded-lg my-4 p-8  max-h-[65vh] overflow-y-scroll">
              {detectedClaims.map((claim, index) => (
                <div key={index} className="flex my-2 gap-1">
                  <Checkbox
                    id={`claim${index}`}
                    onClick={() => pushClaim(index)}
                  />
                  <label
                    htmlFor={`claim${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {claim.content}
                  </label>
                </div>
              ))}
              <Button
                type="submit"
                className="w-full"
                onClick={() => checkFacts()}
              >
                Check Facts
              </Button>
            </div>
          </div>
        </div>
      )}
      {isCheckLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>Checking Facts for your content. This may take a while</p>
        </div>
      )}
      {isFacts && (
        <div>
          <div className="max-w-3xl relative mx-auto my-4">
            <div className="flex items-center gap-32">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setIsFacts(false);
                  setIsGettingFactInput(true);
                }}
              >
                <ArrowLeft /> Back
              </Button>
              <p className="text-center">Here are the results for your facts</p>
            </div>
            <div className="max-w-3xl border-sky-100 border p-4 rounded-lg flex flex-col justify-start items-center my-4 mx-auto h-[65vh] overflow-y-scroll">
              {response &&
                response.map((claim: any, index: number) => {
                  let data = JSON.parse(claim.copies);
                  const addHyperlinks = (text: string) => {
                    return text.replace(/\^(\d+)/g, (match, number) => {
                      return `<a href="${response[index].relevant_links[number]}">[${number}]</a>`;
                    });
                  };
                  console.log(data);
                  return (
                    <div
                      className="py-2 px-2 bg-slate-200 rounded-sm w-fit text-black text-sm my-1 flex flex-col gap-2"
                      key={index}
                    >
                      <div>
                        <span className="font-bold">Claim: </span>{" "}
                        {claims[index]}
                      </div>
                      <div>
                        <span className="font-bold">Factuality: </span>{" "}
                        <span
                          className={`${
                            data.factuality === "true"
                              ? "bg-green-400 p-1 rounded-sm"
                              : "bg-red-400 p-1 rounded-sm"
                          }`}
                        >
                          {data.factuality.toString()}
                        </span>
                      </div>
                      {data.factuality === false && (
                        <div>
                          <span className="font-bold">Error:</span> {data.error}
                        </div>
                      )}
                      {data.factuality === false && (
                        <div>
                          <span className="font-bold">Correction: </span>
                          {data.correction}
                        </div>
                      )}
                      <div>
                        <span className="font-bold">Reasoning: </span>
                        {parse(addHyperlinks(data.reasoning))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
