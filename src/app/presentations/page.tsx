"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Lottie from "lottie-react";
import Animation from "../../../public/Animation.json";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function ProductGen() {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>();
  const [description, setDescription] = useState("");
  const [featureType, setFeatureType] = useState("");
  const [isGettingBlogInput, setIsGettingBlogInput] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isBlogGenerated, setIsBlogGenerated] = useState(false);
  const generatePresentatian = () => {
    setIsGettingBlogInput(false);
    setIsBlogLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Accept': '*/*'
      },
      body:
        JSON.stringify({
              content: description,
            }),
    };

    let url = "http://13.49.72.82:3000";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data);
        setIsBlogLoading(false);
        setIsGettingBlogInput(true);
        toast({
          title: "Your Presentation has started to download",
        })
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsBlogLoading(false);
        setIsGettingBlogInput(true);
        toast({
          title: "Your Presentation has started to download",
        })
      });
  };

  return (
    <div className="h-screen p-24">
      <h1 className="text-4xl font-bold">Present Perfect</h1>
      <p className="text-xl font-medium">Create the presentations you need</p>
      {isGettingBlogInput && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <div className="flex flex-col w-full items-start space-x-2 gap-2">
            <Label className="font-bold text-lg">Content</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your Topic here"
            />
            <Button
              type="submit"
              className="w-full"
              onClick={() => generatePresentatian()}
            >
              Generate Presentation
            </Button>
          </div>
        </div>
      )}
      {isBlogLoading && (
        <div className="max-w-3xl border-sky-100 border p-12 rounded-lg flex flex-col justify-center items-center my-4 mx-auto">
          <Lottie animationData={Animation} loop={true} />
          <p>Your presentation is getting generated. This might take a while</p>
        </div>
      )}
    </div>
  );
}
